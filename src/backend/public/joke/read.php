<?php

require_once('../../private/joke-crud.php');
require_once('../../private/utils.php');
require_once('../../private/models/response.php');

// get "id" from URL params
$id;
if( Utils::getIntParamFromURL($id, 'id'))
{
    die("Unable to get id!");
}

if( !JokeCRUD::read($joke, $id) )
{
  echo( Response::failure(null)->json() );
  exit(0);
}

// return it as json
echo( Response::success($joke)->json() );

?>
