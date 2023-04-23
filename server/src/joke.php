<?php
session_start();

require_once('./core/joke-crud.php');
require_once('./core/response.php');
require_once('./core/url-params.php');
require_once('./core/user.php');

header("Access-Control-Allow-Origin: ".ACCESS_CONTROL_ALLOW_ORIGIN);
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

switch( $_SERVER['REQUEST_METHOD'] )
{
    case 'GET':
        $id   = UrlParams::requireInt('id');
        $joke = JokeCRUD::read($id);
        if( $joke === NULL)
        {
            http_response_code(400);
            Response::failure("Unable to read the joke", $id);
        }
        Response::success($joke);

    case 'POST':
       // get raw data (text)
        $raw_data = file_get_contents('php://input');
        if (!$raw_data)
        {
            http_response_code(400);
            Response::failure("A JSON file must be sent");
        }

        // try to decode raw_data
        $data = json_decode($raw_data);
        if (!$data)
        {
            http_response_code(400);
            Response::failure("Unable to decode JSON");
        }

        // try to create the joke
        $joke = Joke::fromObject($data);
        $joke->visible = FALSE; // needs to be validated by admin

        if (!JokeCRUD::create($joke))
        {
            http_response_code(500);
            Response::failure("Unable to create the joke!");
        }
        Response::success($joke);

    case 'PATCH':
        User::exit_if_not_logged();
        $rawData  = file_get_contents('php://input');
        $data     = json_decode($rawData);
        $joke     = Joke::fromObject($data);
        
        if( !JokeCRUD::update($joke) )
        {
            http_response_code(500);
            Response::failure("Unable to update joke");
        }
        Response::success($joke);

    case 'DELETE':
        User::exit_if_not_logged();
        $id = UrlParams::requireInt('id');
        if( !JokeCRUD::delete($id) )
        {
          http_response_code(500);
          Response::failure('Cannot delete joke '.$id);
        }
        Response::success('joke '.$id.' deleted');
        
    default:
        Response::failure('Method not handled');
}

?>
