<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    $userId = parameter($data, 'userid');
    $booksIds = parameter($data, 'booksids');

    $commandRepository = Repository::getCommandRepository();
    $commandRepository->save($userId, $booksIds);
} else {
    CustomError::error_not_found();
}