<?php

class CommandRepository extends Repository {
    public function __construct() {
        parent::__construct();
    }

    public function get_quantity($userId, $bookId) {
        $stmt = self::$pdo->prepare("SELECT qte, MAX(date) as date FROM lignescmd NATURAL JOIN commandes WHERE idpersonne=:userid AND idouvrage=:bookid");
        $stmt->bindParam(':userid', $userId);
        $stmt->bindParam(':bookid', $bookId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result == null || $result['qte'] == null) {
            return 0;
        }
        return intval($result['qte']);
    }

    public function get_all() {
        $stmt = self::$pdo->prepare("SELECT * FROM commandes");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result == null) {
            return null;
        }
        $booksPayload = new Books();
        $books = [];
        foreach ($result as $book) {
            $generated_book = new Book();
            $generated_book->id = intval($book['idouvrage']);
            $generated_book->title = utf8_encode($book['titre']);
            $generated_book->author = utf8_encode($book['auteur']);
            $generated_book->price = floatval($book['prix']);
            array_push($books, $generated_book);
        }
        $booksPayload->books = $books;
        return $booksPayload;
    }
}