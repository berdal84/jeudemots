<?php

require_once 'joke.php';

class Pages
{
    public $size  = 0;
    public $count = 0;
}

/**
 * Simple class to wrap a joke array with some info about the page
 */
class Page
{
    public $jokes;
    public $id;
    public $size ;

    function __construct(int $id, int $size)
    {
        $this->id    = $id;
        $this->size  = $size;
        $this->jokes = array();
    }
}

?>