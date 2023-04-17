<?php

require_once('joke-crud.php');
require_once('response.php');
require_once('user.php');

session_start();
User::exit_if_not_logged();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PATCH");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$rawData  = file_get_contents('php://input');
$data     = json_decode($rawData);
$joke     = new Joke();
$joke->fromObject($data);

if( !JokeCRUD::update($joke) )
{
    http_response_code(500);
    die( Response::failure("Unable to update joke"));
}

// return it as json
die( Response::success($joke));

?>
