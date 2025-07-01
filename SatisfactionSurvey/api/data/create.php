<?php
include '../config.php';
header("Access-Control-Allow-Origin:".$originURL);
header("Access-Control-Allow-Headers: content-type");
header("Content-Type: application/json; charset=UTF-8");
include '../db.php';

// $data = json_decode(file_get_contents('php://input'));

if($_SERVER['REQUEST_METHOD'] !== "POST"){
    echo json_encode(array('status' => 'error'));
    die();
}

if(isset($_POST)){
    $data_endcode = file_get_contents('php://input');

    $data = json_decode($data_endcode , true);

        
    $first_decryption = base64_decode( $data['officer_id']);
    $sec_decryption = base64_decode($first_decryption);

    try{
        $stmt = $dbh->prepare('INSERT INTO data ( officer_id,  point , suggestions) VALUE (?  , ?  ,?)');
        $stmt->bindParam(1, $sec_decryption);
        $stmt->bindParam(2, $data['point']);
        $stmt->bindParam(3, $data['suggestions']);
        
        if($stmt->execute()){
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
}

?>