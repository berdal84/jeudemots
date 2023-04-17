<?php

require_once('joke-crud.php');
require_once('url-params.php');
require_once('response.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// get "id" from URL params
$id;
if( !UrlParams::getInt($id, 'id'))
{
    http_response_code(400);
    die( Response::failure("id is required", $id) );
}

if( !JokeCRUD::read($joke, $id) )
{
  http_response_code(400);
  die( Response::failure("Unable to read the joke", $id) );
}

die( Response::success($joke) );

?>
