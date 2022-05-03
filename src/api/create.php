<?php

require_once('joke-crud.php');

// get raw data (text)
$raw_data = file_get_contents('php://input');
if(!$raw_data)
{
    die("No data found!");
}

// try to decode raw_data
$data = json_decode($raw_data);
if(!$data)
{
    die("Unable to decode data!");
}

// try to create the joke
$joke = Joke::newFromObject($data);
$joke->visible = FALSE; // needs to be validated by admin
if( !JokeCRUD::create($joke) )
{
    die("Unable to create the joke!");
}

echo( json_encode($joke) );

?>