<?php
// backend/src/auth.php
function login() {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    // Demo: sabit kullanıcı
    if ($email === 'demo@demo.com' && $password === 'demo123') {
        echo json_encode([
            'token' => 'demo-token',
            'user' => [
                'id' => 1,
                'name' => 'Demo User',
                'email' => $email
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Giriş başarısız']);
    }
}

function register() {
    $input = json_decode(file_get_contents('php://input'), true);
    // Demo: her kaydı kabul et
    echo json_encode([
        'token' => 'demo-token',
        'user' => [
            'id' => rand(2,9999),
            'name' => $input['name'] ?? 'Yeni Kullanıcı',
            'email' => $input['email'] ?? ''
        ]
    ]);
}

function me() {
    // Demo: sabit kullanıcı
    echo json_encode([
        'user' => [
            'id' => 1,
            'name' => 'Demo User',
            'email' => 'demo@demo.com'
        ]
    ]);
}
