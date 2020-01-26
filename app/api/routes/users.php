<?php
include "/app/api/header.php";
include "/app/api/errors.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode(4);
} else {
    http_response_code(404);
    echo $error_404;
    die();
}