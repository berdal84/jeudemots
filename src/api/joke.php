<?php

/* Joke class to wrap a Joke as an object.
   We need this to store a Joke row temporarly */
class Joke {

    public $visible   = TRUE;
    public $id        = -1;
    public $category  = '';
    public $text      = '';
    public $author    = '';
    public $date      = '';
    public $is_null   = FALSE;    

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