
<?php

/**
 * This scripts send a Joke proposal by mail to contact@dalle-cort.fr
 * 
 * Prerequisites:
 * ==============
 * 
 * 1 - the JSON object should be a POST variable named 'joke':
 * -----------------------------------------------------------
 * 
 *  $_POST['joke']
 * 
 * 2 - the joke should be a JSON object matching with this template :
 * ------------------------------------------------------------------
 *  
 * {
 *      category:   string,
 *      text:       string,
 *      author:     string,
 *      date:       string
 * }
 * 
 * 3 - the emitter email should be a POST variable named 'from':
 * -------------------------------------------------------------
 * 
 * $_POST['from']
 * 
 */

// Get the POST variables
$from    = $_POST['from'];
$joke    = filter_var( $_POST['joke'], FILTER_VALIDATE_EMAIL );

// Prepare the mail parameters
$to      = 'contact@dalle-cort.fr';
$subject = 'Joke Proposal';
$message = $joke;
$headers = array(
    'From'     => $from,
    'Reply-To' => $from,
    'X-Mailer' => 'PHP/' . phpversion()
);

// set the mail and echo a message in case of success / fail

if ( mail($to, $subject, $message, $headers) ) {
    echo "Mail sent !";
} else {
    echo "Mail sending failed !";
}

?>
