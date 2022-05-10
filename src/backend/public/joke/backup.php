<?php

/*
    Backup db to JSON
*/

require_once('../../private/joke-crud.php');
require_once('../../private/models/response.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$jokes = array();

if( !JokeCRUD::backup($jokes) )
{
    echo(Response::failure([])->json());
    exit;
}
echo(Response::success($jokes)->json());

?>
