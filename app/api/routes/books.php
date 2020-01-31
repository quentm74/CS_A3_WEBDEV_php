<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $bookRepository = new BookRepository();
    $books = $bookRepository->get_all();

    header('Content-type: application/json');
    echo $books->toJson();
} else {
    CustomError::error_not_found();
}