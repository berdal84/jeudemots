<?php
  require_once('response.php');
  require_once('user.php');

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  session_start();

  $rawData 	= file_get_contents('php://input');
  $data 	= json_decode($rawData);

  if(!User::login($data->username, $data->password))
  {
    http_response_code(401)
    die( Response::failure("The couple username/password does not match with any valid account") );
  }

  die( Response::success("Login successful") );
?>
