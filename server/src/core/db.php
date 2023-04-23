<?php

require_once __DIR__.'/joke-crud.php';

class DB
{
  static function connect()
  {
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    // Check connection
    if (!$mysqli) {
      Response::failure("DB: Could not connect.");
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
