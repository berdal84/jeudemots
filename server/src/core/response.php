<?php

class Response
{
    public $ok;
    public $data;
    public $error;
    public $code;

    function __construct(bool $ok, $data, ?string $error = NULL)
    {
      $this->ok    = $ok;
      $this->data  = $data;
      $this->error = $error;
      $this->code  = http_response_code();
    }

    static public function failure($error, $data = NULL): void
    {
      $response = new Response(false, $data, $error);
      die(json_encode($response));
    }

    static public function success($data): void
    {
      $response = new Response(true, $data);
      die(json_encode($response));
    }
}

?>
