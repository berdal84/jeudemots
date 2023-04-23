<?php

require_once __DIR__.'/../config.php';
require_once __DIR__.'/response.php';

class User
{
  static public function session_start(): bool
  {
    session_set_cookie_params([
      'lifetime' => 3600,
      'domain' => COOKIE_DOMAIN,
    ]);
    return session_start();
  }

  static public function login(string $username, string $password): bool
  {
    if(session_status() !== PHP_SESSION_ACTIVE)
    {
      return false;
    }

    $is_admin = $username === ADMIN_USER && $password === ADMIN_PASS; // password is sha256 hashed on client side

    if( $is_admin )
    {
      $_SESSION['is_admin'] = true;
      return true;
    }
    return false;
  }

  static public function logout(): bool
  {
    if(session_status() !== PHP_SESSION_ACTIVE)
    {
      return false;
    }
    session_unset();
    session_destroy();
    return true;
  }

  static public function is_logged(): bool
  {
    return session_status() === PHP_SESSION_ACTIVE
      && isset($_SESSION['is_admin'])
      && $_SESSION['is_admin'];
  }

  static public function exit_if_not_logged()
  {
    if( !User::is_logged() )
    {
      http_response_code(403);
      Response::failure("Forbidden");
    }
  }
}
?>
