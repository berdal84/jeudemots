<?php

class Response
{
    public $status;
    public $data;

    function __construct(string $status, $data)
    {
      $this->status = $status;
      $this->data   = $data;
    }

    /* Convert response to json string */
    public function json(): string
    {
      $response = new Response($this->status, $this->data);
      return json_encode($response);
    }

    static public function failure($data): Response
    {
      return new Response('failure', $data);
    }

    static public function success($data): Response
    {
      return new Response('success', $data);
    }
}

?>
