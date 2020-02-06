<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['userid'];

    $bookRepository = Repository::getBookRepository();
    $books = $bookRepository->get_all($userId);

    header('Content-type: application/json');
    echo $books->toJson();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    $title = parameter($data, 'title');
    $authors = parameter($data, 'authors');
    $price = parameter($data, 'price');

    $bookRepository = Repository::getBookRepository();
    $bookRepository->add($title, $authors, $price);
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'));

    $id = parameter($data, 'id');

    $bookRepository = Repository::getBookRepository();
    $bookRepository->remove($id);
} else {
    CustomError::error_not_found();
}