<?php

require_once('../lib/authentication.php');
require_once('../lib/db.php');
require_once('../lib/header.php');
require_once('../lib/joke-crud.php');
require_once('../lib/mail.php');
require_once('../lib/response.php');
require_once('../lib/url-params.php');

class App
{
    public static function start()
    {
        Authentication::session_start();
        Header::headers();        
    }

    public static function start_if_logged()
    {
        App::start();
        Authentication::exit_if_not_logged();
    }
}

?>