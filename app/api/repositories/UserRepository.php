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
        $user = new User();
        $user->id = $result['idpersonne'];
        $user->first_name = $result['prenom'];
        $user->last_name = $result['nom'];
        $user->address = $result['adresse'];
        $user->bookseller = $result['libraire'];
        return $user;
    }
}