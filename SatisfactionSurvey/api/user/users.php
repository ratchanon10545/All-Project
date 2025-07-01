<?php
include '../config.php';
header("Access-Control-Allow-Origin:".$originURL);
header("Content-Type: application/json; charset=UTF-8");
include '../db.php';

$personnels = array();

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
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        if($data['role'] == 'ADMIN'){
            foreach($dbh->query('SELECT * from officer') as $row){
                $personnel = array(
                    'id' => $row['id'],
                    'image' => path2url($row['image_name'] , $row['path_image']) ,
                    'name' => $row['name'],
                    'rank' => $row['rank'],
                    
                );
                array_push($personnels,$personnel);
            }
            echo json_encode($personnels);
            
            $dbh = null;
        }
        else{
            $object = new stdClass();
            $object->RespCode = 400;
            $object->RespMessage = 'wrong tokne 3';
            echo json_encode($object);
        }
    }
    else {
        $object = new stdClass();
        $object->RespCode = 400;
        $object->RespMessage = 'wrong tokne 2';
        echo json_encode($object);
    }
    }
    else {
        $object = new stdClass();
        $object->RespCode = 400;
        $object->RespMessage = 'wrong tokne 1';
        echo json_encode($object);
    }
function path2url($file,$path, $Protocol='http://') {
    $fullpath = $path.$file;
    return $Protocol.$_SERVER['HTTP_HOST'].str_replace($_SERVER['DOCUMENT_ROOT']  ,'', $fullpath);
}
?>