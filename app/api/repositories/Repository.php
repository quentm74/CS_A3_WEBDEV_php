<?php
abstract class Repository {

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
}