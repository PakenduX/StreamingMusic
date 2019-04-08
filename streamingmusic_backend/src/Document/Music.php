<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @MongoDB\Document
 */
class Music
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The title is required")
     */
    protected $title;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The music is required")
     */
    protected $file;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The user is required")
     */
    protected $user;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The PlayList is required")
     */
    protected $playList;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }


    /**
     * @return mixed
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @param mixed $file
     */
    public function setFile($file): void
    {
        $this->file = $file;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user): void
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getPlayList()
    {
        return $this->playList;
    }

    /**
     * @param mixed $playList
     */
    public function setPlayList($playList): void
    {
        $this->playList = $playList;
    }




}