<?php
    require_once('db.php');
    require_once('response.php');
    require_once('user.php');

    session_start();
    User::exit_if_not_logged();

    if(!DB::install())
    {
      echo( Response::failure("Unable to install!")->json() );
      exit;
    }

    echo( Response::success("Install successful")->json() );


?>
