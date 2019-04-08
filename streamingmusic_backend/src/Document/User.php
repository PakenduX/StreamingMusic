<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Bundle\MongoDBBundle\Validator\Constraints\Unique;
/**
 * @MongoDB\Document
 * @Unique(
 *     fields = {"email", "username"},
 *     message="This email or username is already used"
 *)
 *
 */
class User implements UserInterface
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The first name is required")
     * @Assert\Regex(
     *     pattern="/\d/",
     *     match=false,
     *     message="Your first name cannot contain numbers"
     * )
     */
    protected $firstname;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The last name is required")
     * @Assert\Regex(
     *     pattern="/\d/",
     *     match=false,
     *     message="Your last name cannot contain numbers"
     * )
     */
    protected $lastname;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The username name is required")
     *
     */
    protected $username;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The email address is required")
     * @Assert\Email(
     *     message = "The email '{{ value }}' is not a valid email address",
     * )
     */
    protected $email;

    /**
     * @MongoDB\Field(type="string")
     * @Assert\NotBlank(message="The password is required")
     * @Assert\Length(min="8", minMessage="Your password must contain at least 8 characters")
     */
    protected $password;

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
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param mixed $firstname
     */
    public function setFirstname($firstname): void
    {
        $this->firstname = $firstname;
    }

    /**
     * @return mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param mixed $lastname
     */
    public function setLastname($lastname): void
    {
        $this->lastname = $lastname;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param mixed $username
     */
    public function setUsername($username): void
    {
        $this->username = $username;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email): void
    {
        $this->email = $email;
    }


    /**
     * @param mixed $password
     */
    public function setPassword($password): void
    {
        $this->password = $password;
    }


    /**
     * Returns the roles granted to the user.
     *
     *     public function getRoles()
     *     {
     *         return ['ROLE_USER'];
     *     }
     *
     * Alternatively, the roles might be stored on a ``roles`` property,
     * and populated in any number of different ways when the user object
     * is created.
     *
     * @return (Role|string)[] The user roles
     */
    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }
}