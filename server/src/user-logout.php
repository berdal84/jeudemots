<?php

  require_once('user.php');
  require_once('response.php');

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  session_start();

  if( !User::logout() )
  {
    echo( Response::failure("Unable to logout!")->json() );
  }

  echo( Response::success("Unlogged")->json() );
?>
