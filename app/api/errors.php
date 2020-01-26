<?php

class CustomError {
    public $code;
    public $msg;

    public function __construct($code, $msg) {
        $this->code = $code;
        $this->msg = $msg;
    }
}

$error_404 = json_encode(new CustomError(404, "Lost?"));