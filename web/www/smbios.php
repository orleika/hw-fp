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

if (stripos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    $input_post = json_decode(file_get_contents('php://input'));
} else {
    header('Content-Type: appliaction/json; charset=UTF-8', true, 400);
    die(json_encode(array('error' => 'Not allowed Content-Type')));
}

try {
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    header('Content-Type: appliaction/json; charset=UTF-8', true, 500);
    die(json_encode(array('error' => 'Databse connection error')));
}

try {
    $params = [
        'name' => $input_post->name,
        'body' => $input_post->smbios,
        'version' => $input_post->version,
    ];
    $implode = function ($glue, $params) {
        return implode($glue, array_keys($params));
    };
    $statement = "INSERT INTO smbios ({$implode(',', $params)}) VALUES (:{$implode(',:', $params)});";
    $stmt = $dbh->prepare($statement);
    $stmt->execute($params);
} catch (PDOException $e) {
    header('Content-Type: appliaction/json; charset=UTF-8', true, 500);
    die(json_encode(array('error' => $e)));
}

echo(json_encode(array('result' => 'success')));
