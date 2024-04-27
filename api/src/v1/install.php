<?php

require_once('../lib/db.php');
require_once('../lib/response.php');
require_once('../lib/header.php');

Header::access_control_allow_origin(...ACCESS_CONTROL_ALLOW_ORIGIN);
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if (!DB::install())
{
  http_response_code(500);
  Response::failure("Install FAILED");
}

Response::success("Install OK");

?>
