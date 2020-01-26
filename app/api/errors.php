<?php

class CustomError {
    public $code;
    public $msg;

    public function __construct($code, $msg) {
        $this->code = $code;
        $this->msg = $msg;
    }
}

function error_not_found() {
    header('Content-type: text/plain');
    echo json_encode(new CustomError(404, "Lost?"));
    die();
}

function error_missing_parameter($parameter) {
    header('Content-type: text/plain');
    echo json_encode(new CustomError(400, sprintf("Missing argument %s", $parameter)));
    die();
}


