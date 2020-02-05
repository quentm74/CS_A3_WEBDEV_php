<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['userid'];

    $bookRepository = Repository::getBookRepository();
    $books = $bookRepository->get_all($userId);

    header('Content-type: application/json');
    echo $books->toJson();
} else {
    CustomError::error_not_found();
}