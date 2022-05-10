<?php

/*
    Backup db to JSON
*/

require_once('joke-crud.php');
require_once('response.php');
require_once('session.php');

Session::start();
Session::exit_if_not_logged();

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
