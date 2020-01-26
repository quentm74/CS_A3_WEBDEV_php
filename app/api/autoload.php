<?php
spl_autoload_register(function ($class_name) {
    $directories = array(
        '/app/api/',
        '/app/api/payloads/',
    );

    foreach($directories as $directory) {
        if(file_exists($directory.$class_name . '.php')) {
            require_once($directory.$class_name . '.php');
            return;
        }
    }
});