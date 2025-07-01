<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include '../db.php';


if($_SERVER['REQUEST_METHOD'] !== "DELETE"){
    echo json_encode(array('status' => 'error'));
    die();
}

if (!isset($_SERVER["HTTP_X_API_KEY"])) {
    echo json_encode('no tokne');
    die();
}

$query = "select * from users where token = ?";
$stmt = $dbh->prepare($query);
    if($stmt->execute([
        $_SERVER["HTTP_X_API_KEY"]
    ])){
        $num = $stmt->rowCount();
        if($num == 1) {
            $data_user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($data_user['role'] == 'ADMIN'){
                $object = new stdClass();
                $object->RespCode = 200;
                $object->RespMessage = 'success';
            }
        }
        else {
            echo json_encode('wrong token 2');
            die();
        }
    }
    else {
        echo json_encode('wrong token 1');
            die();
    }

    
$stmt = $dbh->prepare('SELECT * FROM officer WHERE id=:id');
$stmt->bindParam(':id',$_GET['id']);
$stmt->execute();

foreach($stmt as $row){
    $personnel = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'position' => $row['rank'],
        'filename' => $row['image_name'],
        'path' => $row['path_image']
    );
    unlink('../../image/officers/'.$personnel['filename']);
}

$stmt = $dbh->prepare('DELETE FROM officer WHERE id=:id');
$stmt->bindParam(':id',$_GET['id']);
if($stmt->execute()){
    echo json_encode(array('status' => 'OK'));
}
else{
    echo json_encode(array('status' => 'error'));
}


// and now we're done; close it

$dbh = null;

?>