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
    die("Unable to get id!");
}

if( !JokeCRUD::read($joke, $id) )
{
  echo( Response::failure(null)->json() );
  exit(0);
}

// return it as json
echo( Response::success($joke)->json() );

?>
