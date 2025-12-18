<?php
// backend/src/admin.php
function isAdmin($token) {
    // Demo: sabit admin token
    return $token === 'Bearer admin-token';
}

function adminLogin() {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    // Demo: sabit admin
    if ($email === 'admin@demo.com' && $password === 'admin123') {
        echo json_encode([
            'token' => 'admin-token',
            'user' => [
                'id' => 99,
                'name' => 'Admin',
                'email' => $email,
                'role' => 'admin'
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Admin giriş başarısız']);
    }
}

function adminStations() {
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!isAdmin($token)) {
        http_response_code(401);
        echo json_encode(['error' => 'Yetkisiz']);
        return;
    }
    // Demo: sabit istasyonlar
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
        // ... Diğer istasyonlar ...
    ];
    echo json_encode(['items' => $stations]);
}

function adminUsers() {
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!isAdmin($token)) {
        http_response_code(401);
        echo json_encode(['error' => 'Yetkisiz']);
        return;
    }
    // Demo: sabit kullanıcılar
    $users = [
        ['id' => 1, 'name' => 'Demo User', 'email' => 'demo@demo.com'],
        ['id' => 99, 'name' => 'Admin', 'email' => 'admin@demo.com', 'role' => 'admin']
    ];
    echo json_encode(['items' => $users]);
}

function adminCampaigns() {
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!isAdmin($token)) {
        http_response_code(401);
        echo json_encode(['error' => 'Yetkisiz']);
        return;
    }
    // Demo: sabit kampanyalar
    $campaigns = [
        ['id' => 1, 'title' => 'ZES %10 İndirim', 'desc' => 'Tüm ZES istasyonlarında %10 indirim!', 'brand' => 'zes', 'validUntil' => '2025-12-31'],
        ['id' => 2, 'title' => 'Tesla Ücretsiz Şarj', 'desc' => 'Kanyon Tesla Supercharger’da 1 saat ücretsiz şarj.', 'brand' => 'tesla', 'validUntil' => '2025-12-25']
    ];
    echo json_encode(['items' => $campaigns]);
}
