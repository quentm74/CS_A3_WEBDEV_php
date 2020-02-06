<?php

class UserRepository extends Repository {
    public function __construct() {
        parent::__construct();
    }

    public function get_by_id_and_password($id, $password) {
        $stmt = self::$pdo->prepare("SELECT * FROM personnes WHERE idpersonne=:id AND password=:pass");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':pass', $password);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result == null) {
            return null;
        }
        $user = new Command();
        $user->id = utf8_encode($result['idpersonne']);
        $user->first_name = utf8_encode($result['prenom']);
        $user->last_name = utf8_encode($result['nom']);
        $user->address = utf8_encode($result['adresse']);
        $user->bookseller = utf8_encode($result['libraire']);
        return $user;
    }

    public function get_all() {
        $stmt = self::$pdo->prepare("SELECT * FROM personnes");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result == null) {
            return null;
        }
        $usersPayload = new Commands();
        $users = [];
        foreach ($result as $user) {
            $generated_user = new Command();
            $generated_user->id = intval($user['idpersonne']);
            $generated_user->first_name = utf8_encode($user['prenom']);
            $generated_user->last_name = utf8_encode($user['nom']);
            $generated_user->address = utf8_encode($user['adresse']);
            $generated_user->bookseller = intval($user['libraire']);
            array_push($users, $generated_user);
        }
        $usersPayload->users = $users;
        return $usersPayload;
    }

    public function insert_then_get_id($first_name, $last_name, $address, $password, $bookseller) {
        $stmt = self::$pdo->prepare("INSERT INTO personnes (nom, prenom, adresse, password, libraire) VALUES (:last_name, :first_name, :address, :password, :bookseller);");
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':bookseller', $bookseller);
        $stmt->execute();
        return self::$pdo->lastInsertId();
    }
}