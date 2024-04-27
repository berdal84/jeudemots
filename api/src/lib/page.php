<?php

require_once __DIR__.'/joke.php';

/**
 * Simple class to wrap a joke array with some info about the page
 */
class Page
{
    public $jokes;
    public $id;
    public $size;
    public $count;

    function __construct(int $id, int $size, int $count, ?array $jokes = array())
    {
        $this->id    = $id;
        $this->size  = $size;
        $this->count = $count;
        $this->jokes = $jokes;
    }
}

?>
