<?php

abstract class Payload {
    public function toJson() {
        return json_encode($this);
    }
}