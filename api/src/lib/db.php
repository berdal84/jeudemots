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

  public static function uninstall(): bool
  {
    return DB::query_from_sql_file(__DIR__.'/../sql/uninstall.sql');
  }

  public static function install(): bool
  {
    return DB::query_from_sql_file(__DIR__.'/../sql/install.sql');
  }

  private static function query_from_sql_file($path): bool
  {
    $mysqli = DB::connect();
    $sql = file_get_contents($path);
    $success = $mysqli->multi_query($sql);
    $mysqli->close();
    return $success;
  }
}

?>
