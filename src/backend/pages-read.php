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

$size = 0;
if( !UrlParams::getInt($size, 'size'))
{
    die("Unable to get size!");
}

$pages = new Pages();
$pages->size = $size;

if( !JokeCRUD::read_pages($pages) )
{
  echo( Response::failure(null)->json() );
  exit(0);
}
echo( Response::success($pages)->json() );

?>
