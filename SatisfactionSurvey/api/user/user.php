<?php
include '../config.php';
header("Access-Control-Allow-Origin:".$originURL);
header("Content-Type: application/json; charset=UTF-8");
include '../db.php';


$first_decryption = base64_decode( $_GET['id'] );
$sec_decryption = base64_decode($first_decryption);


$stmt = $dbh->prepare('SELECT * FROM officer WHERE id=:id');
$stmt->bindParam(':id',$sec_decryption);
$stmt->execute();


foreach($stmt as $row){
    $personnel = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'position' => $row['rank'],
        'filename' => $row['image_name'],
        'path' =>  $row['path_image'],
        'image' => path2url($row['image_name'] , $row['path_image']) 
    );
    echo json_encode($personnel);
}

// and now we're done; close it

$dbh = null;

function path2url($file,$path, $Protocol='http://') {
    $fullpath = $path.$file;
    return $Protocol.$_SERVER['HTTP_HOST'].str_replace($_SERVER['DOCUMENT_ROOT']  ,'', $fullpath);
}
?>