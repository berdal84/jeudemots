<?php

class Response
{
    public $ok;
    public $data;
    public $error;

    function __construct($ok, $data, $error)
    {
      $this->ok   = $ok;
      $this->data = $data;
      $this->error = $error;
    }

    static public function failure($error, $data = NULL): string
    {
      response = new Response(false, $data, $error);
      return json_encode(response);
    }

    static public function success($data): string
    {
      response = new Response(false, $data, NULL);
      return json_encode(response);
    }
}

?>
