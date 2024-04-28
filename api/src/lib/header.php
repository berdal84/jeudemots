<?php

class Header {
    public static function headers()
    {
        Header::cors();
    }

    /**
     *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
     *  origin.
     *
     *  In a production environment, you probably want to be more restrictive, but this gives you
     *  the general idea of what is involved.  For the nitty-gritty low-down, read:
     *
     *  - https://developer.mozilla.org/en/HTTP_access_control
     *  - https://fetch.spec.whatwg.org/#http-cors-protocol
     * 
     * source: https://stackoverflow.com/questions/8719276/cross-origin-request-headerscors-with-php-headers
     *
     */
    private static function cors()
    {
        // Allow from any origin
        $any_origin = $_SERVER['HTTP_ORIGIN'];
        if (isset($any_origin))
        {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Origin: {$any_origin}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }
        
        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
        {
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        
            exit(0);
        }
    }
}

?>