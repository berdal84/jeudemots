<?php
  require_once('core/user.php');
  require_once('core/response.php');
  require_once('core/user.php');
  require_once('core/header.php');

  User::session_start();
  
  Header::access_control_allow_origin(...ACCESS_CONTROL_ALLOW_ORIGIN);
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  switch( $_SERVER['REQUEST_METHOD'] )
  {
    case 'POST':
      $rawData 	= file_get_contents('php://input');
      $data 	= json_decode($rawData);
      if(!User::login($data->username, $data->password))
      {
        http_response_code(401);
        Response::failure("The couple username/password does not match with any valid account");
      }
      Response::success("Logged");

    case 'GET':
      if(User::is_logged())
        Response::success("Session found");
      Response::failure("No session found");

    case 'DELETE':
      if( !User::logout() )
      {
        http_response_code(500);
        Response::failure("Unable to logout");
      }
      Response::success("Disconnected");
  }

?>
