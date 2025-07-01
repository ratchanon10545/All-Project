<?php
if (isset($_GET['lat']) && isset($_GET['lon'])) {
    $lat = $_GET['lat'];
    $lon = $_GET['lon'];

    // ใช้ API ภายนอกเช่น OpenCage หรือ Google Maps เพื่อตรวจสอบจังหวัด
    $url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=$lat&longitude=$lon&localityLanguage=th";
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    echo $data['principalSubdivision'] ?? 'ไม่พบข้อมูล';
} else {
    echo "ข้อมูลไม่ครบถ้วน";
}
?>
