<?php

class Header {
    public static function access_control_allow_origin(string ...$allowedOrigins) {          
        if(in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins))
        {
            $http_origin = $_SERVER['HTTP_ORIGIN'];
        } else {
            $http_origin = null;
        }
        header("Access-Control-Allow-Origin: $http_origin");
    }
}

?>