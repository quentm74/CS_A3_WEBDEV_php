<?php

class CustomError {
    public $code;
    public $msg;

    public function __construct($code, $msg) {
        $this->code = $code;
        $this->msg = $msg;
    }

    static function error_not_found() {
        header('Content-type: text/plain');
        echo json_encode(new CustomError(404, "Lost?"));
        die();
    }

    static function error_missing_parameter($parameter) {
        header('Content-type: text/plain');
        echo json_encode(new CustomError(400, sprintf("Missing argument %s", $parameter)));
        die();
    }

    static function error_connection_database($e) {
        header('Content-type: text/plain');
        echo json_encode(new CustomError(400, sprintf("Could not connect to database : %s", $e)));
        die();
    }
}


