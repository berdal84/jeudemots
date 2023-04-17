<?php

  require_once('user.php');
  require_once('response.php');

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  session_start();

  if( !User::logout() )
  {
    http_response_code(500);
    die( Response::failure("Unable to logout") );
  }

  die( Response::success("Successfully disconnected") );
?>
