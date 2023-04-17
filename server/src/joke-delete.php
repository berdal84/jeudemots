<?php

require_once('joke-crud.php');
require_once('response.php');
require_once('user.php');
require_once('url-params.php');

session_start();
User::exit_if_not_logged();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$id = -1;

if(!UrlParams::getInt($id, 'id'))
{
  http_response_code(400);
  die( Response::failure('Invalid id') );
}

if( !JokeCRUD::delete($id) )
{
  http_response_code(500);
  die( Response::failure('Cannot delete joke '.$id) );
}

// return it as json
echo( Response::success('joke '.$id.' deleted') );

?>
