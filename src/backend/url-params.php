<?php

class UrlParams
{
    /**
     * Helper to get an integer from URL parameters.
     */
    static function getInt(int &$out, string $name): bool
    {
        // get from URL params
        $str = $_GET[$name];
        if( !isset($str) )
        {
            return false;
        }

        // clean value and check if is numeric
        $i = trim($str);
        if( empty($i) && !is_numeric($i) )
        {
            return false;
        }

        // get the joke given the id
        $out = intval($i);
        return true;
    }
}

?>
