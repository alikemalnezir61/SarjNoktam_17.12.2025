<?php
// backend/src/campaigns.php
function campaigns() {
    // Demo: sabit kampanya listesi
    $campaigns = [
        [
            'id' => 1,
            'title' => 'ZES %10 İndirim',
            'desc' => 'Tüm ZES istasyonlarında %10 indirim!',
            'brand' => 'zes',
            'validUntil' => '2025-12-31'
        ],
        [
            'id' => 2,
            'title' => 'Tesla Ücretsiz Şarj',
            'desc' => 'Kanyon Tesla Supercharger’da 1 saat ücretsiz şarj.',
            'brand' => 'tesla',
            'validUntil' => '2025-12-25'
        ]
    ];
    echo json_encode(['items' => $campaigns]);
}
