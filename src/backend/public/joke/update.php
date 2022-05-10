<?php

require_once('../../private/joke-crud.php');
require_once('../../private/utils.php');
require_once('../../private/models/response.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$rawData 	= file_get_contents('php://input');
$data 		= json_decode($rawData);
$joke     = new Joke();
$joke->fromObject($data);

if( !JokeCRUD::update($joke) )
{
  echo( Response::failure(null)->json() );
  exit;
}

// return it as json
echo( Response::success($joke)->json() );

?>
