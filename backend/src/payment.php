<?php
// backend/src/payment.php
function payment() {
    $input = json_decode(file_get_contents('php://input'), true);
    $stationId = $input['stationId'] ?? null;
    $amount = $input['amount'] ?? null;
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    // Demo: token kontrolü
    if ($token !== 'Bearer demo-token') {
        http_response_code(401);
        echo json_encode(['error' => 'Yetkisiz']);
        return;
    }
    // Demo: ödeme işlemi
    if ($stationId && $amount) {
        echo json_encode([
            'success' => true,
            'message' => 'Ödeme başarılı',
            'chargeId' => rand(1000,9999)
        ]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Eksik bilgi']);
    }
}
