<?php

require_once __DIR__.'/../config.php';
require_once __DIR__.'/response.php';

class Authentication
{
  static public function session_start(): bool
  {
    session_set_cookie_params([
      'lifetime' => COOKIE_LIFETIME,
      'domain' => COOKIE_DOMAIN,
    ]);

    if( !session_start() ) return false;
    
    if (isset($_SESSION['created_at']) &&
        time() - $_SESSION['created_at'] > COOKIE_LIFETIME)
    {
        session_regenerate_id(true); // invalidate old session ID
    }
    $_SESSION['created_at'] = time();
    $_SESSION['lifetime'] = COOKIE_LIFETIME;
    return true;
  }

  static public function info(): stdClass
  {
    $info = new stdClass();
    $info->created_at = $_SESSION['created_at'];
    $info->lifetime   = $_SESSION['lifetime'];
    $info->is_admin   = $_SESSION['is_admin'];
    return $info;
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
    if( !Authentication::is_logged() )
    {
      http_response_code(403);
      Response::failure("Forbidden");
    }
  }
}
?>
