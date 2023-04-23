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

    static function fromObject(object $data): Joke
    {
        $joke = new Joke();
        $joke->id       = property_exists($data, "id") ? intval($data->id) : -1;
        $joke->visible  = property_exists($data, "visible") ? boolval($data->visible) : false;
        $joke->category = strval($data->category);
        $joke->text     = strval($data->text);
        $joke->author   = strval($data->author);

        if( !property_exists($data, "date") )
        {
            $date = new DateTime();
            $joke->date = $date->format('Y-m-d');
        }
        else
        {
            $joke->date     = strval($data->date);
        }
        return $joke;
    }

    /* Create a Joke from an array. T
       The array must contain the fields: id, visible, category, text, author and date */
    static function fromArray( array $row ): Joke
    {
        $joke = new Joke();
        $joke->id       = $row['id'];
        $joke->visible  = filter_var( $row['visible'], FILTER_VALIDATE_BOOLEAN );
        $joke->category = $row['category'];
        $joke->text     = $row['text'];
        $joke->author   = $row['author'];
        $joke->date     = $row['date'];
        return $joke;
    }
}

?>
