<?php

require_once('../lib/app.php');

App::start_if_logged();

$action = UrlParams::getString('action');

switch( $action ) {

  case 'install':
    if (!DB::install())
    {
      http_response_code(500);
      Response::failure("Unable to install!");
    }
    Response::success("Install successful");

  case 'uninstall':
    if (!DB::uninstall())
    {
      http_response_code(500);
      Response::failure("Unable to uninstall!");
    }
    Response::success("Uninstall successful");

  case 'backup':
    $jokes = array();
    if( !JokeCRUD::backup($jokes) )
    {
        http_response_code(500);
        Response::failure("Backup failed");
    }
    Response::success($jokes);

  case 'restore':
    // get raw data (text)
    $file_tmp = $_FILES['file']['tmp_name'];
    if(!$file_tmp)
    {
      http_response_code(400);
      Response::failure("No file found");
    }

    // try to decode raw_data
    $raw_data = file_get_contents($file_tmp);
    $data     = json_decode($raw_data);
    if(!$data)
    {
      http_response_code(400);
      Response::failure("Unable to decode raw data");
    }

    if(!is_array($data))
    {
      http_response_code(400);
      Response::failure("Array is expected");
    }

    $summary = new stdClass();
    $summary->restored_count = 0;
    $summary->deleted_count  = 0;

    // clear table
    if( !JokeCRUD::delete_all($summary->deleted_count) )
    {
      http_response_code(500);
      Response::failure("Unable to delete existing jokes" );
    }

    // loop on array to create jokes (we will use this script rarely, no need to optimize)
    foreach ($data as $each)
    {
      $joke = Joke::fromObject($each);
      if( JokeCRUD::create($joke) === NULL)
      {
          http_response_code(500);
          Response::failure("Unable to create the joke", $joke );
      }
      $summary->restored_count++;
    }
    Response::success($summary);

  default:
    Response::failure("Unknown action: '".$action."' (accepts 'install'|'uninstall')");
  }

?>
