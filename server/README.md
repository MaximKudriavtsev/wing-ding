# Server part of wing-ding app

## Requirements

1. Any webserver ([Openserver](https://ospanel.io/) Windows or [MAMP](https://www.mamp.info/en/downloads/) Mac)
2. [PHP](https://www.php.net/downloads) (usually comes with a web server)
3. [Composer](https://getcomposer.org/)

## Installation

1. Clone the project to the web server folder (domains or htdocs).
2. Install the project by composer

```composer install```

3. Create a .env file and copy the contents of the .env.example file into it.
4. Database 
* Create a database (with phpmyadmin for example), and enter settings in .env:
```
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```
and migrate the database

```php artisan migrate```
* **Or** import the database from the .sql file if you have it.
5. Start the server

```php artisan serve```

The project is now available at http://localhost:8000/.
