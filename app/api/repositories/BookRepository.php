<?php

class BookRepository extends Repository {
    public function __construct() {
        parent::__construct();
    }

    public function get_all($userId) {
        $stmt = self::$pdo->prepare("SELECT * FROM ouvrages");
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
            if ($userId !== null) {
                $generated_book->quantity = Repository::getCommandRepository()->get_quantity($userId, $generated_book->id);
            } else {
                $generated_book->quantity = null;
            }
            array_push($books, $generated_book);
        }
        $booksPayload->books = $books;
        return $booksPayload;
    }

    public function add($title, $authors, $price) {
        $stmt = self::$pdo->prepare("INSERT INTO ouvrages (titre, auteur, prix) VALUES (:title, :author, :price)");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':author', $authors);
        $stmt->bindParam(':price', $price);
        $stmt->execute();
    }
}