<?php
// Mock rota endpointi
header('Content-Type: application/json');
$start = $_GET['start'] ?? 'istanbul';
$end = $_GET['end'] ?? 'ankara';
// Mock response
$response = [
    'start' => $start,
    'end' => $end,
    'polyline' => [
        ['lat' => 41.0082, 'lng' => 28.9784], // İstanbul
        ['lat' => 39.9334, 'lng' => 32.8597], // Ankara
    ],
    'stations' => [
        // Örnek istasyonlar
        ['id' => 1, 'name' => 'ZES Sirkeci', 'lat' => 41.012, 'lng' => 28.976],
        ['id' => 2, 'name' => 'Eşarj Bolu', 'lat' => 40.735, 'lng' => 31.606],
        ['id' => 3, 'name' => 'Tesla Ankara', 'lat' => 39.940, 'lng' => 32.860],
    ]
];
echo json_encode($response);
