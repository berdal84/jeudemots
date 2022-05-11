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
  http_response_code(404);
  exit;
}

if( !JokeCRUD::delete($id) )
{
  echo( Response::failure('Cannot delete joke '.$id)->json() );
  exit;
}

// return it as json
echo( Response::success('joke '.$id.' deleted')->json() );

?>
