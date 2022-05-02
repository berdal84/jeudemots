<?php

require_once 'joke.php';
require_once 'db.php';

class JokeCRUD
{
    public static function create(Joke $joke): bool
    {
        printf( "Create %s", $joke->name);
        // ...
        return TRUE;
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