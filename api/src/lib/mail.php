<?php
require_once __DIR__.'/joke.php';

class Mail {

    public static function sendJokeToModerator(Joke $joke): bool
    {
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

        $message  = sprintf( $messageTemplate,  $joke->category,
                                                $joke->text,
                                                $joke->author,
                                                $joke->date);

        $headers = array(
            'From'          => ADMIN_EMAIL,
            'X-Mailer'      => 'PHP/' . phpversion(),
            'MIME-Version'  => '1.0',
            'Content-Type'  => 'text/html; charset=utf-8'
        );

        return mail($to, $subject, $message, $headers);
    }
}
?>