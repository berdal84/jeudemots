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
        $this->visible   = TRUE;
        $this->id        = -1;
        $this->category  = '';
        $this->text      = '';
        $this->author    = '';
        $this->date      = '';
        $this->is_null   = FALSE;    
    }

    static function newFromObject(object $data): Joke
    {
        $joke = new Joke();
        $joke->visible  = boolval($data->visible);
        $joke->category = strval($data->category);
        $joke->text     = strval($data->text);
        $joke->author   = strval($data->author);
        $joke->date     = strval($data->date);

        return $joke;
    }

    /* Create a null Joke */
    static function newNull(): Joke
    {
        $joke = new Joke();
        $joke->is_null = TRUE; // wanted to avoid the NullObject pattern
        return $joke;
    }

    /* Create a Joke from an array. T
       The array must contain the fields: id, visible, category, text, author and date */
    static function newFromArray( array $row ): Joke
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