<?php

require_once('../lib/app.php');

App::start();

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
