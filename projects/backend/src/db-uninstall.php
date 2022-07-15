<?php
    require_once('db.php');
    require_once('response.php');
    require_once('user.php');

    session_start();
    User::exit_if_not_logged();

    if(!JokeCRUD::uninstall())
    {
      echo( Response::failure("Unable to uninstall!")->json() );
      exit;
    }

    echo( Response::success("Uninstall successful")->json() );
?>
