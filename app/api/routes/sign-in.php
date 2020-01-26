<?php
include '/app/api/autoload.php';
include '/app/api/errors.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    $id = parameter($data, 'id');
    $password = parameter($data, 'password');

    // TODO verify and get user by its repository

    $user = new User();
    $user->id = 0;
    $user->first_name = "Sacha";
    $user->last_name = "Guitry";
    $user->address = "Not far";
    $user->bookseller = true;

    header('Content-type: application/json');
    echo $user->toJson();
} else {
    http_response_code(404);
    error_not_found();
}