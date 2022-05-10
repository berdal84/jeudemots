<?php
  require_once('response.php');
  require_once('session.php');

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  Session::start();

  $rawData 	= file_get_contents('php://input');
  $user 		= json_decode($rawData);

  if(!Session::login($user))
  {
    echo( Response::failure("Unable to login!")->json() );
    exit;
  }

  echo( Response::success("Login successful")->json() );
?>
