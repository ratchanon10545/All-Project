<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include '../db.php';

// $data = json_decode(file_get_contents('php://input'));

if($_SERVER['REQUEST_METHOD'] !== "POST"){
    echo json_encode(array('status' => 'error'));
    die();
}

if (!isset($_SERVER["HTTP_X_API_KEY"])) {
    echo json_encode('no tokne');
    die();
}

$data = $_POST;
$filename = $_FILES["image"]["name"];
$tempname = $_FILES["image"]["tmp_name"];
$folder = "../../image/officers/" . $filename;
// $path = "/SatisfactionSurvey/image/officers/";
$path = "/officer/image/officers/";
try{
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

    $stmt = $dbh->prepare('INSERT INTO officer ( name, rank, image_name , path_image) VALUE (? , ? , ? , ?)');
    $stmt->bindParam(1, $data['name']);
    $stmt->bindParam(2, $data['rank']);
    $stmt->bindParam(3, $filename);
    $stmt->bindParam(4, $path);
    
    if($stmt->execute()){
        move_uploaded_file($tempname, $folder);
        echo json_encode(array('status' => 'OK'));
    }
    else{
        echo json_encode(array('status' => 'error'));
    }

    
    $dbh = null;
}
catch(PDOException $e){
    print 'Error!: '.$e->getMessage().'<br/>';
    die();
}

?>