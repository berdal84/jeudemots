<?php

/* Joke class to wrap a Joke as an object.
   We need this to store a Joke row temporarly */
class Joke {

    public $visible;
    public $id;
    public $category;
    public $text;
    public $author;
    public $date;
    public $is_null;    

    function __construct()
    {
        $this->visible   = FALSE;
        $this->id        = -1;
        $this->category  = '';
        $this->text      = '';
        $this->author    = '';
        $this->date      = '';
        $this->is_null   = FALSE;    
    }

    function fromObject(object $data)
    {
        $this->visible  = boolval($data->visible);
        $this->category = strval($data->category);
        $this->text     = strval($data->text);
        $this->author   = strval($data->author);
        $this->date     = strval($data->date);
    }

    /* Create a Joke from an array. T
       The array must contain the fields: id, visible, category, text, author and date */
    function fromArray( array $row )
    {
        $this->id       = $row['id'];
        $this->visible  = filter_var( $row['visible'], FILTER_VALIDATE_BOOLEAN );
        $this->category = $row['category'];
        $this->text     = $row['text'];
        $this->author   = $row['author'];
        $this->date     = $row['date'];
    }
}

?>