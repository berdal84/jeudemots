<?php

  require_once('session.php');
  require_once('response.php');

  Session::start();
  Session::logout();

  echo( Response::success("Unlogged")->json() );
?>
