<?php
include '/app/api/autoload.php';
include '/app/api/tools.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $commandRepository = Repository::getCommandRepository();
    $commands = $commandRepository->get_all();

    header('Content-type: application/json');
    echo $commands->toJson();
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

    $userId = parameter($data, 'userid');
    $booksIds = parameter($data, 'booksids');
    $valid = parameter($data, 'valid');

    $commandRepository = Repository::getCommandRepository();
    if (!$valid) {
        $commandRepository->save($userId, $booksIds);
    } else {
        $commandRepository->saveValidatedCommand($userId, $booksIds);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'));

    $id = parameter($data, 'id');

    $commandRepository = Repository::getCommandRepository();
    $commandRepository->remove($id);
} else {
    CustomError::error_not_found();
}