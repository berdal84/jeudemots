FROM php:7.2-apache
WORKDIR /var/www/html

# Install MySQL dependency
RUN docker-php-ext-install mysqli

# Copy sources
COPY src .
COPY config.sample.php config.php

# Allow to override files
VOLUME [ "./config.php" ]

# Override entry point
ENTRYPOINT [ "docker-php-entrypoint", "apache2-foreground"]

# Expose regular http/https port
EXPOSE 80
#EXPOSE 443 (TODO: add certificates)