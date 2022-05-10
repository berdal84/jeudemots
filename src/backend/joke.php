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

    function __construct()
    {
        $this->visible   = FALSE;
        $this->id        = -1;
        $this->category  = '';
        $this->text      = '';
        $this->author    = '';
        $this->date      = ''; 
    }

    function fromObject(object $data)
    {
        $this->visible  = property_exists($data, "visible") ? boolval($data->visible) : false;
        $this->category = strval($data->category);
        $this->text     = strval($data->text);
        $this->author   = strval($data->author);

        if( !property_exists($data, "date") )
        {
            $date = new DateTime();
            $this->date = $date->format('Y-m-d');
        }
        else
        {
            $this->date     = strval($data->date);
        }        
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