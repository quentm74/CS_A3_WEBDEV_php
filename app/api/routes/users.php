<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userRepository = Repository::getUserRepository();
    $users = $userRepository->get_all();

    header('Content-type: application/json');
    echo $users->toJson();
} else {
    CustomError::error_not_found();
}