<?php

require_once __DIR__.'/joke.php';
require_once __DIR__.'/page.php';
require_once __DIR__.'/db.php';
require_once __DIR__.'/authentication.php';

class JokeCRUD {
    const filter_separator = ' ';

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

    private static function build_where_clause(mysqli $mysqli, string $filter): string
    {

      $where_clause = "";

      if( !Authentication::is_logged())
      {
          $where_clause = "WHERE `visible` = 1";
      }

      if( !empty($filter))
      {
        if( empty($where_clause) )
        {
          $where_clause = "WHERE (";
        }
        else
        {
          $where_clause .= " AND (";
        }
        $count = 0;
        $word  = strtok($filter, JokeCRUD::filter_separator);

        // we search each word in each column
        while ($word !== false) {

            if( $count )
              $where_clause .= " OR ";

            $s = $mysqli->real_escape_string($word);
            $where_clause .= "(";
            $where_clause .= "    category LIKE '%".$s."%'";
            $where_clause .= " OR text     LIKE '%".$s."%'";
            $where_clause .= " OR author   LIKE '%".$s."%'";
            $where_clause .= " OR date     LIKE '%".$s."%'";
            $where_clause .= ")";

            $word = strtok(JokeCRUD::filter_separator);
            $count++;
        }
        $where_clause .= ")";
      }

      //var_dump($where_clause);
      return $where_clause;
    }

    /**
     * Get a joke page.
     */
    public static function read_page(int $id, int $size, string $filter): ?Page
    {
        $page         = NULL;
        $offset       = $id * $size;
        $limit        = $size;
        $mysqli       = DB::connect();
        $where_clause = JokeCRUD::build_where_clause($mysqli, $filter);

        // COUNT
        $query        = "SELECT COUNT(*) FROM `jokes` ".$where_clause;
        $stmt = $mysqli->prepare($query);
        if( !$stmt ) return NULL; 
        if( !$stmt->execute() ) die("cannot execute statement");
        $result = $stmt->get_result();
        $count = $result->fetch_row()[0];
        if ( $count === 0 ) return new Page($id, $size, 0);

        // PAGE
        $query        = "SELECT * FROM `jokes` ".$where_clause." ORDER BY `date` DESC LIMIT ?, ?";
        $stmt = $mysqli->prepare($query);
        if( !$stmt ) die("Cannot prepare statement for page");
        if( !$stmt->bind_param("ii", $offset, $limit)) die("cannot bind");
        if( !$stmt->execute() ) die("cannot execute statement");
        $result = $stmt->get_result();
        $rows   = $result->fetch_all(MYSQLI_ASSOC);
        $page   = new Page($id, $size, $count);

        foreach ($rows as $row)
        {
            $each_joke = Joke::fromArray($row);
            array_push( $page->jokes, $each_joke);
        }
        
        $mysqli->close();

        return $page;
    }

    public static function create(Joke $joke): ?int
    {
        $id      = NULL;
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
                $id = $stmt->insert_id;
            }
        }
        $mysqli->close();

        return $id;
    }

    public static function read(int $id): ?Joke
    {
        $joke    = NULL;
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
                    $row  = $result->fetch_array(MYSQLI_ASSOC);
                    $joke = Joke::fromArray($row);
                }
            }
        }
        $mysqli->close();
        return $joke;
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
                    $each_joke = Joke::fromArray($row);
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
      $success = false;
      $mysqli  = DB::connect();
      $query = <<<SQL
        UPDATE `jokes`
        SET category = ?, text = ?, author = ?, date = ?, visible = ?
        WHERE id = ?
SQL;
      if( $stmt = $mysqli->prepare($query) )
      {
          $stmt->bind_param("ssssii"
              , $joke->category
              , $joke->text
              , $joke->author
              , $joke->date
              , $joke->visible
              , $joke->id);

            if( $stmt->execute() )
            {
                $success = $stmt->affected_rows !== 0;
            }
      }
      $mysqli->close();

      return $success;
    }

    public static function delete(int $id): bool
    {
      $success = false;
      $mysqli  = DB::connect();
      $query   = 'DELETE FROM `jokes` WHERE id = ?';

      if( $stmt = $mysqli->prepare($query) )
      {
          $stmt->bind_param("i", $id);

            if( $stmt->execute() )
            {
                $success = $stmt->affected_rows !== 0;
            }
      }
      $mysqli->close();

      return $success;
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
