<?php
require_once __DIR__.'/response.php';

class UrlParams
{
    static function requireString(string $name): string
    {
        $result = UrlParams::getString($name);
        if( $result == NULL)
        {
            http_response_code(400);
            Response::failure($name." (string) is required", $result);
        }
        return $result;
    }

    static function requireInt(string $name): int
    {
        $result = UrlParams::getInt($name);
        if( $result === NULL)
        {
            http_response_code(400);
            Response::failure("Url parameter ".$name." (int) is required", $result);
        }
        return $result;
    }

    /**
     * Helper to get an integer from URL parameters.
     */
    static function getInt(string $name, ?int $default = NULL): ?int
    {
        // get from URL params
        if( !isset($_GET[$name]) )
        {
            return $default;
        }
        $str = $_GET[$name];

        // clean value and check if is numeric
        $i = trim($str);
        if( empty($i) && !is_numeric($i) )
        {
            return $default;
        }
        return intval($i);
    }

    /**
     * Helper to get a String from URL parameters.
     */
    static function getString(string $name, ?string $default = NULL): ?string
    {
        $var = $_GET[$name];
        if( !isset($var) || !is_string($var) )
        {
            return $default;
        }

        $str = trim($var);
        if( empty($str) )
        {
            return $default;
        }

        return strval($str);
    }
}

?>
