<?php

require_once 'joke.php';
require_once 'db.php';

class JokeCRUD
{
    public static function create(Joke $joke): bool
    {
        $result = false;
        $mysqli = DB::connect();
        $query  = "INSERT INTO `jokes` (`category`, `text`, `author`, `date`, `visible`) VALUES ( ?, ?, ?, ?, ?)";
        
        if( $stmt = $mysqli->prepare($query) )
        {
            $stmt->bind_param("ssssi"
                , $joke->category
                , $joke->text
                , $joke->author
                , $joke->date
                , $joke->visible);         

            if( $stmt->execute() )
            {     
                $joke->id = $stmt->insert_id;
                $result   = true;
            }
        }
        $mysqli->close();

        return $result;
    }

    public static function read(int $id): Joke
    {
        $joke   = Joke::newNull();
        $mysqli = DB::connect();        
        $query  = "SELECT * FROM jokes WHERE id = ?";
        
        if( $stmt = $mysqli->prepare($query) )
        {
            $stmt->bind_param("i", $id);         

            if( $stmt->execute() )
            {
                $result = $stmt->get_result();
        
                if( $result->num_rows == 1 )
                {
                    $row  = $result->fetch_array(MYSQLI_ASSOC);                    
                    $joke = Joke::newFromArray($row);
                }           
            }
        }
        $mysqli->close();
        return $joke;
    }
    public static function update(Joke $joke)
    {
        printf( "Update %s", $joke->name);
        // ...
    }

    public static function delete(Joke $joke)
    {
        printf( "Delete %s", $joke->name);
        // ...
    }
}

?>