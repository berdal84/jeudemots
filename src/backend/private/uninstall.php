<?php
    require_once('joke-crud.php');
    echo("Uninstalling ...\n");

    if(!JokeCRUD::uninstall())
    {
        http_response_code(500);
        die("Unable to uninstall!");        
    }

    echo("Uninstall done!");
?>