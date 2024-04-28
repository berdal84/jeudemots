<?php

define('DB_HOST', 'db');
define('DB_NAME', 'jokes');
define('DB_USER', 'admin');
define('DB_PASS', 'admin');

define('ADMIN_USER', 'admin');
define('ADMIN_PASS', hash('sha256', 'admin'));
define('ADMIN_EMAIL', '');
define('ACCESS_CONTROL_ALLOW_ORIGIN', '*' );
#define('COOKIE_DOMAIN', 'my.domain.com');
#define('COOKIE_LIFETIME', 60*5); // 5min
define('DEBUG', false);

ini_set('session.use_strict_mode', 1); // see https://www.php.net/manual/en/features.session.security.management.php#features.session.security.management.non-adaptive-session
if(DEBUG) ini_set('display_errors', 1);

?>