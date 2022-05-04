<?php

/*
    Restore db from a JSON
*/

require_once('joke-crud.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


    
// get raw data (text)
$file_tmp = $_FILES['file']['tmp_name'];
if(!$file_tmp)
{
    die("No file found!");
}

// try to decode raw_data
$raw_data = file_get_contents($file_tmp);
$data     = json_decode($raw_data);
if(!$data)
{
    die("Unable to decode raw data!");
}

// try to decode raw_data
if(!is_array($data))
{
    die("Wrong data type!");
}

// loop on array to create jokes (we will use this script once, no need to optimize)
foreach ($data as $each)
{
    $joke = Joke::newFromObject($each);
    if( !JokeCRUD::create($joke) )
    {
        die("Unable to create the joke!");
    }
}

echo("{ result: 'ok'}");
?>