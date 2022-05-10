<?php

class Session
{
  static public function start(): bool
  {
    return session_start();
  }

  static public function is_active(): bool
  {
    return session_status() == PHP_SESSION_ACTIVE;
  }

  static public function is_logged(): bool
  {
    return Session::is_active() && isset($_SESSION['is_logged']);
  }

  static public function exit_if_not_logged()
  {
    if( !Session::is_logged() )
    {
      http_response_code(403);
      exit;
    }
  }

  static public function login($user): bool
  {
    if(!Session::is_active())
    {
      return false;
    }

    // TODO: use db to store login/pwd and check

    $_SESSION['is_logged'] = true;
    return true;
  }

  static public function logout()
  {
    session_unset();
    session_destroy();
  }
}

?>
