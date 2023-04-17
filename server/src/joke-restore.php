<?php

/*
    Restore db from a JSON
*/

require_once('joke-crud.php');
require_once('response.php');
require_once('user.php');

session_start();
User::exit_if_not_logged();

class Summary {
    public $restored_count = 0;
    public $deleted_count = 0;
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// get raw data (text)
$file_tmp = $_FILES['file']['tmp_name'];
if(!$file_tmp)
{
    http_response_code(400);
    die( Response::failure("No file found"));
}

// try to decode raw_data
$raw_data = file_get_contents($file_tmp);
$data     = json_decode($raw_data);
if(!$data)
{
    http_response_code(400);
    die( Response::failure("Unable to decode raw data"));
}

// try to decode raw_data
if(!is_array($data))
{
    http_response_code(400);
    die( Response::failure("Array is expected" ));
}

$summary = new Summary();

// clear table
if( !JokeCRUD::delete_all($summary->deleted_count) )
{
    http_response_code(500);
    die( Response::failure("Unable to delete existing jokes" ));
}

// loop on array to create jokes (we will use this script rarely, no need to optimize)
foreach ($data as $each)
{
    $joke = new Joke();
    $joke->fromObject($each);
    if( !JokeCRUD::create($joke) )
    {
        http_response_code(500);
        die( Response::failure("Unable to create the joke", $joke ));
    }
    $summary->restored_count++;
}

echo( Response::success($summary) );
?>
