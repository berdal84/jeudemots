<?php

require_once('joke-crud.php');

// get "id" from URL params
if( !isset($_GET["id"]) )
{
   die("Unable to get id!"); 
}

// clean value and check if is numeric
$id = trim($_GET["id"]);
if( empty($id) && !is_numeric($id) )
{
    die("id is empty!");
}

// get the joke given the id
$id = intval($id);
$joke = JokeCRUD::read($id);
if( $joke->is_null )
{
    die("Unable to find joke!");
}

// return it as json
echo( json_encode($joke, JSON_PRETTY_PRINT ) );

?>