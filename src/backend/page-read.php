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
    die("Unable to get id!");
}

if( !UrlParams::getInt($size, 'size'))
{
    die("Unable to get size!");
}

UrlParams::getString($filter, 'filter');

$page = new Page($id, $size);

if( !JokeCRUD::read_page($page, $filter) )
{
  echo( Response::failure(null)->json() );
  exit(0);
}
echo( Response::success($page)->json() );

?>
