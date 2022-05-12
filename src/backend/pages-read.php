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

$size   = 0;
$filter = '';

if( !UrlParams::getInt($size, 'size'))
{
    die("Unable to get size!");
}

UrlParams::getString($filter, 'filter');

$pages = new Pages();
$pages->size = $size;

if( !JokeCRUD::read_pages($pages, $filter) )
{
  echo( Response::failure(null)->json() );
  exit(0);
}
echo( Response::success($pages)->json() );

?>
