<?php
/*
    Get a set of N jokes
*/

require_once('joke-crud.php');
require_once('url-params.php');
require_once('response.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$id   = 0;
$size = 0;
$filter = '';

if( !UrlParams::getInt($id, 'id'))
{
    http_response_code(400);
    die( Response::failure("id is required"));
}

if( !UrlParams::getInt($size, 'size'))
{
    http_response_code(400);
    die( Response::failure("size is required"));
}

UrlParams::getString($filter, 'filter');

$page = new Page($id, $size);

if( !JokeCRUD::read_page($page, $filter) )
{
      http_response_code(500);
      die( Response::failure("Unable to get the page"));
}

die( Response::success($page) );

?>
