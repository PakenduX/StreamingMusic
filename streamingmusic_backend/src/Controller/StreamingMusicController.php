<?php

namespace App\Controller;

use App\Document\Music;
use App\Document\PlayList;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class StreamingMusicController extends AbstractFOSRestController
{

    /**
     * @Route("/", name="signIn")
     */
    public function signIn(){}

    /**
     * @Rest\Post("/signUp")
     */
    public function signUp(DocumentManager $dm, Request $request, UserPasswordEncoderInterface $encoder, ValidatorInterface $validator)
    {
        $user = new User();
        $user->setFirstname($request->get('firstname'));
        $user->setLastname($request->get('lastname'));
        $user->setUsername($request->get('username'));
        $user->setEmail($request->get('email'));
        $user->setPassword($request->get('password'));

        $error = $validator->validate($user);
        $errors = [];

        if(count($error) > 0){
            for($i = 0; $i < count($error); $i++)
                array_push($errors, $error[$i]->getMessage());
        }

        if($errors)
            return new JsonResponse([
                'status' => 'error',
                'message' => implode("\n", $errors)
            ]);
        $hash = $encoder->encodePassword($user, $user->getPassword());
        $user->setPassword($hash);

        $dm->persist($user);
        $dm->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Your account has been created successfully.'
        ]);
    }

    /**
     * @Rest\Post("/playlist/create")
     */
    public function createPlayList(DocumentManager $manager, Request $request){
        $pl = new PlayList();
        $pl->setName($request->get('name'));
        $pl->setUser($request->get('user'));

        $manager->persist($pl);
        $manager->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Your playList has been created successfully.'
        ]);
    }

    /**
     * @Rest\Post("/music/create")
     */
    public function createMusic(DocumentManager $manager, Request $request){
        $music = new Music();
        $file = $request->files->get('file');
        $fileName = $this->generateUniqueFileName().".".$file->guessExtension();
        try {
            $file->move(
                $this->getParameter('music_directory'),
                $fileName
            );
        } catch (FileException $e) {
            echo sprintf($e);
        }
        $music->setFile('http://localhost:8000/uploads/musics/'.$fileName);
        $music->setUser($request->get('user'));
        $music->setPlayList($request->get('playlist'));
        $music->setTitle($file->getClientOriginalName());

        $manager->persist($music);
        $manager->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Your music has been uploaded successfully.'
        ]);
    }

    /**
     * @Rest\Get("/playlist/{user}")
     */
    public function getPlayList($user, DocumentManager $manager){
        $pls = $manager->getRepository(PlayList::class)
                ->findBy(['user' => $user]);

            return $pls;

    }
    /**
     * @Rest\Delete("/playlist/delete/{id}")
     */
    public function deletePlayList($id, DocumentManager $manager ){
        $pl = $manager->getRepository(PlayList::class)
            ->find($id);
        $manager->remove($pl);
        $filesystem = new Filesystem();

        $musics = $manager->getRepository(Music::class)
                ->findBy(['playList' => $id]);
        for($i = 0; $i < count($musics); $i++){
            $manager->remove($musics[$i]);
            $filesystem->remove($musics[$i]->getFile());
        }

        $manager->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Your playlist has been deleted successfully.'
        ]);
    }

    /**
     * @Rest\Get("/users/{username}")
     */
    public function getLoggedUser($username, DocumentManager $manager)
    {
        return $manager->getRepository(User::class)
                ->findOneBy(['username' => $username]);
    }

    /**
     * @Rest\Get("/music/{pl}")
     */
    public function getPlMusics($pl, DocumentManager $manager){
        return $manager->getRepository(Music::class)
                    ->findBy(['playList' => $pl]);
    }

    /**
     * @return string
     */
    private function generateUniqueFileName()
    {
        return md5(uniqid());
    }
}
