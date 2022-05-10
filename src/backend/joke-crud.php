<?php

require_once 'joke.php';
require_once 'page.php';
require_once 'db.php';

class JokeCRUD {

    public static function delete_all(int &$delete_count): bool
    {
        $success = false;
        $mysqli  = DB::connect();
        $query   = "DELETE FROM jokes";

        if( $stmt = $mysqli->prepare($query) )
        {
            if( $stmt->execute() )
            {
                $delete_count = $mysqli->affected_rows;
                $success      = true;
            }
        }
        $mysqli->close();

        return $success;
    }

     /**
     * Get joke pages (size and count).
     */
    public static function read_pages(Pages &$pages): bool
    {
        $success = false;
        $mysqli  = DB::connect();
        $query   = "SELECT COUNT(IF(`visible` = 1, 1, NULL)) FROM `jokes`";

        if( $stmt = $mysqli->prepare($query) )
        {
            if( $stmt->execute() )
            {
                $result       = $stmt->get_result();
                $row          = $result->fetch_row();
                $pages->count = ceil($row[0] / $pages->size);
                $success      = true;
            }
        }
        $mysqli->close();

        return $success;
    }


    /**
     * Get a joke page.
     */
    public static function read_page(Page &$page): bool
    {
        $success = false;
        $mysqli = DB::connect();
        $query  = "SELECT * FROM `jokes` WHERE `visible` ORDER BY `date` DESC  LIMIT ?, ?";

        if( $stmt = $mysqli->prepare($query) )
        {
            $offset = $page->id * $page->size;
            $limit  = $page->size;
            $stmt->bind_param("ii", $offset, $limit);

            if( $stmt->execute() )
            {
                $result = $stmt->get_result();
                $rows   = $result->fetch_all(MYSQLI_ASSOC);
                foreach ($rows as $row)
                {
                    $each_joke = new Joke();
                    $each_joke->fromArray($row);
                    array_push( $page->jokes, $each_joke);
                }
                $success = true;
            }
        }
        $mysqli->close();

        return $success;
    }

    public static function create(Joke $joke): bool
    {
        $success = false;
        $mysqli  = DB::connect();
        $query   = "INSERT INTO `jokes` (`category`, `text`, `author`, `date`, `visible`) VALUES ( ?, ?, ?, ?, ?)";

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
                $success   = true;
            }
        }
        $mysqli->close();

        return $success;
    }

    public static function read(Joke& $joke, int $id): bool
    {
        $success = false;
        $mysqli  = DB::connect();
        $query   = "SELECT * FROM jokes WHERE id = ?";

        if( $stmt = $mysqli->prepare($query) )
        {
            $stmt->bind_param("i", $id);

            if( $stmt->execute() )
            {
                $result = $stmt->get_result();

                if( $result->num_rows == 1 )
                {
                    $row     = $result->fetch_array(MYSQLI_ASSOC);
                    $joke->fromArray($row);
                    $success = true;
                }
            }
        }
        $mysqli->close();
        return $success;
    }

    public static function backup( &$array_out ): bool
    {
        $success = false;

        $mysqli = DB::connect();
        $query  = "SELECT * FROM `jokes`";

        if( $stmt = $mysqli->prepare($query) )
        {
            if( $stmt->execute() )
            {
                $result = $stmt->get_result();
                $rows = $result->fetch_all(MYSQLI_ASSOC);
                foreach ($rows as $row)
                {
                    $each_joke = new Joke();
                    $each_joke->fromArray($row);
                    array_push($array_out, $each_joke);
                }
                $success = true;
            }
        }
        $mysqli->close();

        return $success;
    }

    public static function update(Joke $joke): bool
    {
      // TODO
      return false;
    }

    public static function delete(Joke $joke): bool
    {
      // TODO
      return false;
    }

    public static function uninstall(): bool
    {
        $success = false;

        $query = "DROP TABLE jokes";

        //echo("\n".$query."\n");
        $mysqli = DB::connect();

        if( $mysqli->query($query) )
        {
            $success = true;
        }
        $mysqli->close();
        return $success;
    }

    public static function install(): bool
    {
        $success = false;

        $query = <<<SQL
            CREATE TABLE `jokes` (
                `id`       int(11)      NOT NULL,
                `category` varchar(64)  NOT NULL,
                `text`     text         NOT NULL,
                `author`   varchar(64)  NOT NULL,
                `date`     date         DEFAULT NULL,
                `visible`  tinyint(1)   NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

            ALTER TABLE `jokes` ADD PRIMARY KEY (`id`);
            ALTER TABLE `jokes` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
SQL;

        //echo("\n".$query."\n");
        $mysqli = DB::connect();

        if( $mysqli->multi_query($query) )
        {
            $success = true;
        }
        else
        {
            echo("First install? If not, uninstall first.\n");
        }
        $mysqli->close();
        return $success;
    }
}

?>
