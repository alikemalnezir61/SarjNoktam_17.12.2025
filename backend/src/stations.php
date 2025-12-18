<?php
// backend/src/stations.php
function stations() {
    // Demo: sabit istasyon listesi
    $stations = [
        [
            'id' => 1,
            'name' => 'ZES - Zorlu Center',
            'type' => 'DC',
            'status' => 'AVAILABLE',
            'power' => 120,
            'price' => 7.95,
            'brand' => 'zes',
            'lat' => 41.06,
            'lng' => 29.01
        ],
        [
            'id' => 2,
            'name' => 'Tesla Supercharger - Kanyon',
            'type' => 'DC',
            'status' => 'BUSY',
            'power' => 250,
            'price' => 8.50,
            'brand' => 'tesla',
            'lat' => 41.07,
            'lng' => 29.00
        ],
        [
            'id' => 3,
            'name' => 'Eşarj - Maltepe Park',
            'type' => 'AC',
            'status' => 'AVAILABLE',
            'power' => 22,
            'price' => 6.40,
            'brand' => 'esarj',
            'lat' => 40.92,
            'lng' => 29.15
        ]
    ];
    echo json_encode(['items' => $stations]);
}
