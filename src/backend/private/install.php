<?php
    require_once('joke-crud.php');
    require_once('models/response.php');

    if(!JokeCRUD::install())
    {
      echo( Response::failure("Unable to install!")->json() );
      exit;
    }

    echo( Response::success("Install successful")->json() );
?>
