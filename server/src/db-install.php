<?php
    require_once('db.php');
    require_once('response.php');
    require_once('user.php');

    session_start();
    User::exit_if_not_logged();

    if(!DB::install())
    {
      http_response_code(500);
      die( Response::failure("Unable to install!") );
    }

    die( Response::success("Install successful") );
?>
