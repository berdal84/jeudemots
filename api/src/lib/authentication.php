<?php

require_once __DIR__.'/../config.php';
require_once __DIR__.'/response.php';

class Authentication
{
  static public function session_start(): bool
  {    
        
    $lifetime = defined('COOKIE_LIFETIME') ? COOKIE_LIFETIME : 60*4; // 4 min by default
    $domain = defined('COOKIE_DOMAIN') ? COOKIE_DOMAIN : '127.0.0.1';

    $cookie_ok = session_set_cookie_params([
      'lifetime' => $lifetime,
      'domain' => $domain,
      'path' => '/',
      'httponly' => true,
    ]);

    // setcookie('test', 'value', 60*60, "/");

    if ( !$cookie_ok )
    {
      die("cookie error");
    }

    if( !session_start() )
    {
      return false;
    }

    //  Invalidate old cookies
    $created_at = $_SESSION['created_at'];
    if (isset($created_at))
    {
      $age = time() - $created_at;
      if ( $age > $lifetime )
      {
        session_regenerate_id(true); 
      }        
    }

    $_SESSION['created_at'] = time();
    $_SESSION['lifetime'] = $lifetime;
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
