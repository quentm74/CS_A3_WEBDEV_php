<?php

class CustomError {
    public $code;
    public $msg;

    public function __construct($code, $msg) {
        $this->code = $code;
        $this->msg = $msg;
    }

    function perform() {
        header('Content-type: text/plain');
        http_response_code($this->code);
        echo json_encode($this);
        die();
    }

    static function error_not_found() {
        (new CustomError(404, "Lost?"))->perform();
    }

    static function error_missing_parameter($parameter) {
        (new CustomError(400, sprintf("Missing argument %s", $parameter)))->perform();
    }

    static function error_connection_database($e) {
        (new CustomError(400, sprintf("Could not connect to database : %s", $e)))->perform();
    }

    static function error_wrong_credentials() {
        (new CustomError(400, "Wrong credentials"))->perform();
    }
}


