<?php

function parameter($data, $parameter, $nullable = false) {
    if (isset($data->$parameter)) {
        return $data->$parameter;
    }
    if (!$nullable) {
        CustomError::error_missing_parameter($parameter); // die
    }
    return null;
}