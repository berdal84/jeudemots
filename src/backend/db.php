<?php

require_once('joke-crud.php');

class DB
{
    const HOST = 'localhost';
    const NAME = 'jeudemots-ng';
    const USER = 'root';
    const PASS = '';

    static function connect()
    {
        $mysqli = new mysqli(DB::HOST, DB::USER, DB::PASS, DB::NAME);

        // Check connection
        if( !$mysqli)
        {
            die("ERROR: Could not connect. ");
        }

        return $mysqli;
    }

    static function install(): bool
    {
      return JokeCRUD::install(); /* && UserCRUD::install(); */
    }

    static function uninstall(): bool
    {
      return JokeCRUD::uninstall(); /* && UserCRUD::uninstall() */
    }
}

?>
