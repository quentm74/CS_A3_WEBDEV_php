<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    $id = parameter($data, 'id');
    $password = parameter($data, 'password');

    $userRepository = new UserRepository();
    $user = $userRepository->get_by_id_and_password($id, $password);

    if ($user != null) {
        header('Content-type: application/json');
        echo $user->toJson();
        die();
    }

    CustomError::error_wrong_credentials();
} else {
//    http_response_code(404);
    CustomError::error_not_found();
}