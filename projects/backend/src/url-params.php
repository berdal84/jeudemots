<?php

class UrlParams
{
    /**
     * Helper to get an integer from URL parameters.
     */
    static function getInt(int &$out, string $name): bool
    {
        // get from URL params
        if( !isset($_GET[$name]) )
        {
            return false;
        }
        $str = $_GET[$name];

        // clean value and check if is numeric
        $i = trim($str);
        if( empty($i) && !is_numeric($i) )
        {
            return false;
        }

        // stroe int in output
        $out = intval($i);
        return true;
    }

    /**
     * Helper to get a String from URL parameters.
     */
    static function getString(string &$out, string $name): bool
    {
        // get from URL params
        if( !isset($_GET[$name]) )
        {
            return false;
        }
        $str = $_GET[$name];

        // clean value and check if is numeric
        $s = trim($str);
        if( empty($s) )
        {
            return false;
        }

        // store string in output
        $out = strval($s);
        return true;
    }
}

?>
