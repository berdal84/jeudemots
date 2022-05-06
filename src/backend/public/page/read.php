<?php
/*
    Get a set of N jokes
*/

require_once('../../private/joke-crud.php');
require_once('../../private/utils.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$id   = 0;
$size = 0;

if( !Utils::getIntParamFromURL($id, 'id'))
{
    die("Unable to get id!");
}

if( !Utils::getIntParamFromURL($size, 'size'))
{
    die("Unable to get size!");
}

$page = new Page($id, $size);

if( !JokeCRUD::read_page($page) )
{
    http_response_code(500);
}
echo(json_encode($page));

?>