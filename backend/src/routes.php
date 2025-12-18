<?php
// backend/src/routes.php
require_once 'auth.php';
require_once 'stations.php';
require_once 'campaigns.php';
require_once 'payment.php';
require_once 'admin.php';

// Basit router
$path = strtok($_SERVER['REQUEST_URI'], '?');
$method = $_SERVER['REQUEST_METHOD'];

if ($path === '/login' && $method === 'POST') {
    login();
} elseif ($path === '/register' && $method === 'POST') {
    register();
} elseif ($path === '/me' && $method === 'GET') {
    me();
} elseif ($path === '/stations' && $method === 'GET') {
    stations();
} elseif ($path === '/campaigns' && $method === 'GET') {
    campaigns();
} elseif ($path === '/payment' && $method === 'POST') {
    payment();
} elseif ($path === '/admin/login' && $method === 'POST') {
    adminLogin();
} elseif ($path === '/admin/stations' && $method === 'GET') {
    adminStations();
} elseif ($path === '/admin/users' && $method === 'GET') {
    adminUsers();
} elseif ($path === '/admin/campaigns' && $method === 'GET') {
    adminCampaigns();
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
}
