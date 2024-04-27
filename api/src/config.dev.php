<?php

define('DB_HOST', 'db');
define('DB_NAME', 'jokes');
define('DB_USER', 'root');
define('DB_PASS', 'devonly');

define('ADMIN_USER', '');
define('ADMIN_PASS', sha1(''));
define('ADMIN_EMAIL', '');
define('ACCESS_CONTROL_ALLOW_ORIGIN', array('*', 'domain.com') );
define('COOKIE_DOMAIN', '');
define('COOKIE_LIFETIME', 60*30);
define('DEBUG', false);

ini_set('session.use_strict_mode', 1); // see https://www.php.net/manual/en/features.session.security.management.php#features.session.security.management.non-adaptive-session
if(DEBUG) ini_set('display_errors', 1);

?>