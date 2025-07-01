<?php
    require_once('../db.php');


    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $data_endcode = file_get_contents('php://input');
        $data = json_decode($data_endcode , true);
        $token = $data['token'];

        $query = "select * from users where token = ?";
        $stmt = $dbh->prepare($query);
        if($stmt->execute([
            $token
        ])) {
            $num = $stmt->rowCount();
            if($num == 1) {
                $query = 'update users set token = ? where token = ? ';
                $stmt = $dbh->prepare($query);
                if($stmt->execute([
                    null, $token
                ])) {
                    $object = new stdClass();
                    $object->RespCode = 200;
                    $object->RespMessage = 'good';
                }
                else {
                    $object = new stdClass();
                    $object->RespCode = 400;
                    $object->RespMessage = 'bad';
                    $object->Log = 2;
                }
            }
            else {
                $object = new stdClass();
                $object->RespCode = 400;
                $object->RespMessage = 'bad';
                $object->Log = 3;
            }
        }
        else {
            $object = new stdClass();
            $object->RespCode = 400;
            $object->RespMessage = 'bad';
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }
?>