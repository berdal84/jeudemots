<?php
  require_once('response.php');
  require_once('user.php');

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  session_start();

  $rawData 	= file_get_contents('php://input');
  $data 		= json_decode($rawData);

  if(!User::login($data->username, $data->password))
  {
    echo( Response::failure("Unable to login!")->json() );
    exit;
  }

  echo( Response::success("Login successful")->json() );
?>
