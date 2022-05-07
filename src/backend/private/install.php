<?php
    require_once('joke-crud.php');
    echo("Installing ...\n");

    if(!JokeCRUD::install())
    {
        http_response_code(500);
        die("Unable to install!");        
    }

    echo("Install done!");
?>