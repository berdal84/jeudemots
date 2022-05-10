<?php
    require_once('joke-crud.php');
    require_once('models/response.php');

    if(!JokeCRUD::uninstall())
    {
      echo( Response::failure("Unable to uninstall!")->json() );
      exit;
    }

    echo( Response::success("Uninstall successful")->json() );
?>
