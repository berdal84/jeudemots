<?php

require_once('../../private/joke-crud.php');
require_once('../../private/utils.php');

// get "id" from URL params
$id;
if( Utils::getIntParamFromURL($id, 'id'))
{
    die("Unable to get id!");
}

if( !JokeCRUD::read($joke, $id) )
{
    die("Unable to find joke!");
}

// return it as json
echo( json_encode($joke, JSON_PRETTY_PRINT ) );

?>