
<?php

require_once('core/config.php');
require_once('core/response.php');
require_once('core/user.php');
  
User::session_start();

/**
 * This scripts send a Joke proposal by mail to ADMIN_EMAIL (cf. config.php)
 * 
 * Prerequisites:
 * ==============
 * 
 * the body of the request should be a JSON with this form :
 * 
 * {
 * 		from: 'email@adress.com',
 * 		joke: {
 *      	category:   string,
 *      	text:       string,
 *      	author:     string,
 *      	date:       string        // 'yyyy-MM-dd' formatted
 * 		}
 * }
 * 
 */
header("Access-Control-Allow-Origin: ".ACCESS_CONTROL_ALLOW_ORIGIN);
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Get the JSON from the body of the post request
$rawData 	= file_get_contents('php://input');                   // Takes raw data from the request
$data 		= json_decode($rawData);

// Prepare the mail parameters
$to      = ADMIN_EMAIL;
$subject = 'Proposition de jeu de mots';

$messageTemplate = "
<html>
    <body>
        <h1>Nouvelle proposition de jeu de mot !</h1>
        <h2>Jeu de mot</h2>
        <p>Catégorie: %s</p>
        <p>Texte: %s</p>
        <p>Auteur: %s</p>
        <p>Date: %s</p>
    </body>
</html>
";

$message  = sprintf( $messageTemplate,  $data->joke->category,
                                        $data->joke->text,
                                        $data->joke->author,
                                        $data->joke->date);


$headers = array(
	'From'          => $data->from,
    'X-Mailer'      => 'PHP/' . phpversion(),
    'MIME-Version'  => '1.0',
	'Content-Type'  => 'text/html; charset=utf-8'
);

// set the mail and echo a message in case of success / fail

if ( !mail($to, $subject, $message, $headers) ) {
    http_response_code(500);
    Response::failure("Joke couldn't be submitted");
}
Response::success("Joke submitted");

?>