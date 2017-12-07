<?php
require_once __DIR__ . '/../vendor/autoload.php';

if (!isset($_ENV['MYSQL_HOST'])) {
    $dotenv = new \Dotenv\Dotenv(__DIR__ . '/../../');
    $dotenv->load();
    $_ENV['APP_PATH'] = getenv('APP_PATH');
    $_ENV['MYSQL_HOST'] = getenv('MYSQL_HOST');
    $_ENV['MYSQL_DATABASE'] = getenv('MYSQL_DATABASE');
    $_ENV['MYSQL_USER'] = getenv('MYSQL_USER');
    $_ENV['MYSQL_PASSWORD'] = getenv('MYSQL_PASSWORD');
    $_ENV['SALT'] = getenv('SALT');
}

$klein = new \Klein\Klein();

$request = \Klein\Request::createFromGlobals();
$uri = $request->server()->get('REQUEST_URI');
$request->server()->set('REQUEST_URI', substr($uri, strlen($_ENV['APP_PATH'])));

try {
    App\Models\DB::connect();
} catch (PDOException $e) {
    header('Content-Type: appliaction/json; charset=UTF-8', true, 500);
    die(json_encode(['error' => $e]));
}

$klein->respond(function ($request, $response, $service, $app) use ($klein) {
    $klein->onError(function ($klein, $err_msg) {
        $klein->service()->flash($err_msg);
    });
    $service->layout('../app/Views/layouts/base.phtml');
    $service->appPath = $_ENV['APP_PATH'];
});

$klein->onHttpError(function ($code, $router) {
    switch ($code) {
        case 404:
            $router->service()->render('../app/Views/404.phtml');
            break;
        default:
            $router->response()->body('Oh no, a bad error happened that caused a '. $code);
    }
});

$klein->respond(['GET', 'POST'], '/[:controller]?/[**:rest]?', function ($request, $response, $service, $app) use ($klein) {
    $controller_class = 'App\Controllers\\'.ucfirst($request->controller).'Controller';
    if (class_exists($controller_class)) {
        $app->register('controller', function () use ($controller_class, $request, $response, $service, $app) {
            return new $controller_class($request, $response, $service, $app);
        });
    } else {
        $klein->abort(404);
    }
});

$klein->respond('GET', '/', function ($request, $response, $service, $app) {
    $service->render('../app/Views/index.phtml');
});

$klein->respond('POST', '/hwInfo', function ($request, $response, $service, $app) {
    $app->controller->create();
});

$klein->respond('GET', '/hwFp/[a:token]', function ($request, $response, $service, $app) {
    $app->controller->index($request->token);
});

$klein->respond('POST', '/hwFp', function ($request, $response, $service, $app) {
    $app->controller->create();
});

$klein->dispatch($request);
