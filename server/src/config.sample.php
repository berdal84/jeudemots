<?php

// When invoking the script via CLI like
// "php -f script.php name1=value1 name2=value2",
// this code will populate $_GET variables called
// "name1" and "name2", so a script designed to
// be called by a web server will work even
// when called by CLI
if (php_sapi_name() == "cli") {
    for ($c = 1; $c < $argc; $c++) {
        $param = explode("=", $argv[$c], 2);
        $_GET[$param[0]] = $param[1]; // $_GET['name1'] = 'value1'
        //print($param[0]."=".$param[1]);
    }
}

define('DB_HOST', '');
define('DB_NAME', '');
define('DB_USER', '');
define('DB_PASS', '');

define('ADMIN_USER', '');
define('ADMIN_PASS', '');
define('ADMIN_EMAIL', '');
define('ACCESS_CONTROL_ALLOW_ORIGIN', '');
define('COOKIE_DOMAIN', '');
define('DEBUG', false);

if( DEBUG) ini_set('display_errors', 1);

?>