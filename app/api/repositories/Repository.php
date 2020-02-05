<?php
abstract class Repository {

    private static $bookRepository = null;
    private static $userRepository = null;
    private static $commandRepository = null;

    protected static $pdo = null;

    public function __construct() {
        if (self::$pdo == null) { // should init pdo
            try {
                self::$pdo = new PDO('mysql:host=mariadb;dbname=bdlibrairie', 'root', 'pass');
            } catch (PDOException $e) {
                CustomError::error_connection_database($e);
            }
        }
    }

    public static function getBookRepository() {
        if (self::$bookRepository == null) {
            self::$bookRepository = new BookRepository();
        }
        return self::$bookRepository;
    }

    public static function getUserRepository() {
        if (self::$userRepository == null) {
            self::$userRepository = new UserRepository();
        }
        return self::$userRepository;
    }

    public static function getCommandRepository() {
        if (self::$commandRepository == null) {
            self::$commandRepository = new CommandRepository();
        }
        return self::$commandRepository;
    }


}