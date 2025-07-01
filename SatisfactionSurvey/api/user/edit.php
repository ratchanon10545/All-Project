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

$data = $_POST;

$stmt = $dbh->prepare('SELECT * FROM officer WHERE id=:id');
$stmt->bindParam(':id',$data['id']);
$stmt->execute();

foreach($stmt as $row){
    $personnel = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'position' => $row['rank'],
        'filename' => $row['image_name'],
        'path' =>  $row['path_image'],
    );
    // echo json_encode($personnel);
}

if($_FILES){
    $filename = $_FILES["image"]["name"];
    $tempname = $_FILES["image"]["tmp_name"];
    $old_filename = $personnel['filename'];
}
else{
    $filename = $personnel['filename'];
}

$folder = "../../image/officers/" . $filename;
// $path = "/SatisfactionSurvey/image/officers/";
$path = "/officer/image/officers/";
try{
    $stmt = $dbh->prepare('UPDATE officer SET name = ? , rank = ? , image_name = ? , path_image = ? WHERE id = ?');
    $stmt->bindParam(5, $data['id']);
    $stmt->bindParam(1, $data['name']);
    $stmt->bindParam(2, $data['rank']);
    $stmt->bindParam(3, $filename);
    $stmt->bindParam(4, $path);
    
    if($stmt->execute()){
        echo json_encode(array('status' => 'OK'));
    }
    else{
        echo json_encode(array('status' => 'error'));
    }

    if($_FILES){
        if (move_uploaded_file($tempname, $folder)) {
            unlink('../../image/officers/'.$old_filename);
            // echo "<h3>&nbsp; Image uploaded successfully!</h3>";
        } else {
            echo "<h3>&nbsp; Failed to upload image!</h3>";
        }
    }
    

    $dbh = null;
}
catch(PDOException $e){
    print 'Error!: '.$e->getMessage().'<br/>';
    die();
}

?>