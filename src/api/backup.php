<?php

/*
    Backup db to JSON
*/

require_once('joke-crud.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$array = array();

if( !JokeCRUD::read_all($array) )
{
    http_response_code(500);
}
echo(json_encode($array));

?>