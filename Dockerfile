FROM php:fpm
RUN docker-php-ext-install pdo_mysql
EXPOSE 9000