<?php

define('DB_HOST', 'db');
define('DB_NAME', 'jokes');
define('DB_USER', 'root');
define('DB_PASS', 'devonly');

define('ADMIN_USER', 'root');
define('ADMIN_PASS', hash('sha256', 'devonly'));
define('ADMIN_EMAIL', '');
define('ACCESS_CONTROL_ALLOW_ORIGIN', '*' );
#define('COOKIE_DOMAIN', 'my.domain.com');
#define('COOKIE_LIFETIME', 60*5); // 5min
define('DEBUG', false);

ini_set('session.use_strict_mode', 1); // see https://www.php.net/manual/en/features.session.security.management.php#features.session.security.management.non-adaptive-session
if(DEBUG) ini_set('display_errors', 1);

?>