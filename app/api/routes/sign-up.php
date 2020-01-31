<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    $first_name = parameter($data, 'first_name');
    $last_name = parameter($data, 'last_name');
    $address = parameter($data, 'address');
    $password = parameter($data, 'password');

    $userRepository = new UserRepository();
    $id_inserted = $userRepository->insert_then_get_id($first_name, $last_name, $address, $password, 0);

    header('Content-type: application/json');
    $id = new NewId();
    $id->id = $id_inserted;
    echo $id->toJson();
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userRepository = new UserRepository();
    $id_inserted = $userRepository->insert_then_get_id("", "", "", "", 0);
    echo "OK ";
    echo $id_inserted;
} else {
//    http_response_code(404);
    CustomError::error_not_found();
}