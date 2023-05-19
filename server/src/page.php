<?php
/*
    Get a set of N jokes
*/

require_once 'core/joke-crud.php';
require_once 'core/url-params.php';
require_once 'core/header.php';

Header::access_control_allow_origin(...ACCESS_CONTROL_ALLOW_ORIGIN);
header("Access-Control-Allow-Methods: OPTIONS, GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

Authentication::session_start();

$id     = UrlParams::requireInt('id');
$size   = UrlParams::getInt('size', 10);
$filter = UrlParams::getString('filter', '');
$page   = JokeCRUD::read_page($id, $size, $filter);

if( $page === NULL )
{
    http_response_code(500);
    Response::failure("Unable to get the page");
}

Response::success($page);

?>
