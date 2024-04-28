<?php
  require_once('../lib/app.php');

  App::start();
  
  switch( $_SERVER['REQUEST_METHOD'] )
  {
    case 'POST':
      $rawData 	= file_get_contents('php://input');
      $data 	= json_decode($rawData);
      if(!Authentication::login($data->username, $data->password))
      {
        http_response_code(401);
        Response::failure("The couple username/password does not match with any valid account");
      }
      Response::success(Authentication::info());

    case 'GET':
      if(Authentication::is_logged())
        Response::success("Session found");
      Response::failure("No session found");

    case 'DELETE':
      if( !Authentication::logout() )
      {
        http_response_code(500);
        Response::failure("Unable to logout");
      }
      Response::success("Disconnected");
  }

?>
