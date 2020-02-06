<?php

class CommandRepository extends Repository {
    public function __construct() {
        parent::__construct();
    }

    public function get_quantity($userId, $bookId) {
        $stmt = self::$pdo->prepare("SELECT qte, MAX(date) as date FROM lignescmd NATURAL JOIN commandes WHERE idpersonne=:userid AND idouvrage=:bookid AND validee=0");
        $stmt->bindParam(':userid', $userId);
        $stmt->bindParam(':bookid', $bookId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result == null || $result['qte'] == null) {
            return 0;
        }
        return intval($result['qte']);
    }

    public function save($userId, $bookIds) {
        // disable foreign_key_checks because the database does not delete on cascade...
        $stmt = self::$pdo->prepare("
            SET FOREIGN_KEY_CHECKS = 0;
            DELETE FROM commandes WHERE validee=0 AND idpersonne=:userid;
            SET FOREIGN_KEY_CHECKS = 1;
        ");
        $stmt->bindParam(':userid', $userId);
        $stmt->execute();

        $stmt = self::$pdo->prepare("INSERT INTO commandes (idpersonne, date, validee) VALUES (:userid, NOW(), 0)");
        $stmt->bindParam(':userid', $userId);
        $stmt->execute();

        $commandId = self::$pdo->lastInsertId();

        foreach (array_count_values($bookIds) as $bookId => $qte) {
            $stmt = self::$pdo->prepare("INSERT INTO lignescmd (idcmd, idouvrage, qte) VALUES (:commandid, :bookid, :qte)");
            $stmt->bindParam(':commandid', $commandId);
            $stmt->bindParam(':bookid', $bookId);
            $stmt->bindParam(':qte', $qte);
            $stmt->execute();
        }
    }

    public function saveValidatedCommand($userId, $bookIds) {
        $stmt = self::$pdo->prepare("INSERT INTO commandes (idpersonne, date, validee) VALUES (:userid, NOW(), 1)");
        $stmt->bindParam(':userid', $userId);
        $stmt->execute();

        $commandId = self::$pdo->lastInsertId();

        foreach (array_count_values($bookIds) as $bookId => $qte) {
            $stmt = self::$pdo->prepare("INSERT INTO lignescmd (idcmd, idouvrage, qte) VALUES (:commandid, :bookid, :qte)");
            $stmt->bindParam(':commandid', $commandId);
            $stmt->bindParam(':bookid', $bookId);
            $stmt->bindParam(':qte', $qte);
            $stmt->execute();
        }
    }

    public function get_all() {
        $stmt = self::$pdo->prepare("SELECT * FROM commandes NATURAL JOIN personnes");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result == null) {
            return new Commands();
        }
        $commandsPayload = new Commands();
        $commands = [];
        foreach ($result as $command) {
            $generated_command = new Command();

            $generated_user = new User();
            $generated_user->id = intval($command['idpersonne']);
            $generated_user->first_name = utf8_encode($command['prenom']);
            $generated_user->last_name = utf8_encode($command['nom']);
            $generated_user->address = utf8_encode($command['adresse']);
            $generated_user->bookseller = intval($command['libraire']);
            $generated_command->user = $generated_user;

            $generated_command->id = intval($command['idcmd']);
            $generated_command->date = utf8_encode($command['date']);
            $generated_command->validated = intval($command['validee']);

            $stmt = self::$pdo->prepare("SELECT * FROM lignescmd NATURAL JOIN ouvrages WHERE idcmd=:idcmd");
            $stmt->bindParam(':idcmd', $generated_command->id);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $books = [];
            if ($result != null) {
                foreach ($result as $book) {
                    $generated_book = new Book();
                    $generated_book->id = intval($book['idouvrage']);
                    $generated_book->title = utf8_encode($book['titre']);
                    $generated_book->author = utf8_encode($book['auteur']);
                    $generated_book->price = floatval($book['prix']);
                    $generated_book->quantity = intval($book['qte']);
                    array_push($books, $generated_book);
                }
            }
            $generated_command->books = $books;

            array_push($commands, $generated_command);
        }
        $commandsPayload->commands = $commands;
        return $commandsPayload;
    }
}