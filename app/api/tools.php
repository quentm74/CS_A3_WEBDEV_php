<?php

function parameter($data, $parameter) {
    if (isset($data->$parameter)) {
        return $data->$parameter;
    }
    error_missing_parameter($parameter); // die
    return null;
}