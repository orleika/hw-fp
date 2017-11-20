<?php
require_once dirname(__FILE__) . '/vendor/autoload.php';
$dotenv = new Dotenv\Dotenv(__DIR__ . '../');
$dotenv->load();

$_ENV['MYSQL_HOST'] = getenv('MYSQL_HOST');
$_ENV['MYSQL_DATABASE'] = getenv('MYSQL_DATABASE');
$_ENV['MYSQL_USER'] = getenv('MYSQL_USER');
$_ENV['MYSQL_PASSWORD'] = getenv('MYSQL_PASSWORD');

$dsn = "mysql:host={$_ENV['MYSQL_HOST']};dbname={$_ENV['MYSQL_DATABASE']};charset=utf8";
$user = $_ENV['MYSQL_USER'];
$password = $_ENV['MYSQL_PASSWORD'];
$dbh = new PDO($dsn, $user, $password);
$sql = "SELECT version();";
foreach ($dbh->query($sql, PDO::FETCH_ASSOC) as $row) {
    print_r($row);
}
