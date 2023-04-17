<?php
    require_once('db.php');
    require_once('response.php');
    require_once('user.php');

    session_start();
    User::exit_if_not_logged();

    if(!JokeCRUD::uninstall())
    {
      http_response_code(500);
      die( Response::failure("Unable to uninstall!") );
    }

    die( Response::success("Uninstall successful") );
?>
