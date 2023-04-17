<?php

require_once('joke-crud.php');
require_once('response.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// get raw data (text)
$raw_data = file_get_contents('php://input');
if(!$raw_data)
{
    http_response_code(400);
    die( Response::failure("A JSON file must be sent") );
}

// try to decode raw_data
$data = json_decode($raw_data);
if(!$data)
{
    http_response_code(400);
    die( Response::failure("Unable to decode JSON") );
}

// try to create the joke
$joke = new Joke();
$joke->fromObject($data);
$joke->visible = FALSE; // needs to be validated by admin

if( !JokeCRUD::create($joke) )
{
    http_response_code(500);
    die( Response::failure("Unable to create the joke!") );
}

die( Response::success($joke));

?>
