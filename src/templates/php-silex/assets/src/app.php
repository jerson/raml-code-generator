<?php

use Silex\Application;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\ValidatorServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\FormServiceProvider;
use Silex\Provider\TranslationServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\HttpFragmentServiceProvider;
use ORM\Provider\DoctrineORMServiceProvider;

$app = new Application();

$app->register(new UrlGeneratorServiceProvider());
$app->register(new ValidatorServiceProvider());
$app->register(new ServiceControllerServiceProvider());
$app->register(new TwigServiceProvider());
$app->register(new FormServiceProvider());
$app->register(new HttpFragmentServiceProvider());

$app->register(new TranslationServiceProvider(), array(
    'translator.domains' => array(),
));

$app['twig'] = $app->share($app->extend('twig', function ($twig, $app) {
    // add custom globals, filters, tags, ...
    return $twig;
}));

$app->register(new SessionServiceProvider(), array(
  'session.storage.options' => array('cookie_lifetime' => 10800)
));

$app->register(new DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'        => 'pdo_mysql',
        'host'          => 'localhost',
        'dbname'        => 'prueba',
        'user'          => 'prueba',
        'password'      => 'prueba',
    ),
));

$app->register(new DoctrineORMServiceProvider(), array(
    'db.orm.class_path'            => __DIR__.'/../vendor/doctrine/orm/lib',
    'db.orm.proxies_dir'           => __DIR__.'/../var/cache/doctrine/Proxy',
    'db.orm.proxies_namespace'     => 'DoctrineProxy',
    'db.orm.auto_generate_proxies' => true,
    'db.orm.entities'              => array(array(
        'type'      => 'annotation',
        'path'      => __DIR__.'/Entity',
        'namespace' => 'Entity',
    )),
));

$app['form.extensions'] = $app->share($app->extend('form.extensions', function ($extensions) use ($app) {
    $manager = new Form\Extensions\Doctrine\Bridge\ManagerRegistry(null, array(), array('db.orm.em'), null, null, '\Doctrine\ORM\Proxy\Proxy');
    $manager->setContainer($app);
    $extensions[] = new Symfony\Bridge\Doctrine\Form\DoctrineOrmExtension($manager);
    return $extensions;
}));

require __DIR__.'/routes.php';

return $app;
