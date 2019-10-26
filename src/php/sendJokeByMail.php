
<?php

/**
 * This scripts send a Joke proposal by mail to contact@dalle-cort.fr
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

// Get the JSON from the body of the post request
$rawData 	= file_get_contents('php://input');                   // Takes raw data from the request
$data 		= json_decode($rawData);

// Prepare the mail parameters
$to      = 'contact@dalle-cort.fr';
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
	'Content-Type'  => 'text/html',
	'Charset'       => 'utf-8'
);

// set the mail and echo a message in case of success / fail

if ( mail($to, $subject, $message, $headers) ) {
    echo "Mail sent !";
} else {
    die( "Mail sending failed !" );
}

?>