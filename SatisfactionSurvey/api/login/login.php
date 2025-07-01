<?php
    include '../config.php';
    header("Access-Control-Allow-Origin:".$originURL);
    header("Access-Control-Allow-Headers: content-type");
    header("Content-Type: application/json; charset=UTF-8");
    require_once('../db.php');
    date_default_timezone_set("Asia/Bangkok");

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $data_endcode = file_get_contents('php://input');
        $data = json_decode($data_endcode , true);

        $txt_username = $data['username'];
        $txt_password = $data['password'];

        $now = date("Y-m-d H:i:s"); 
        $gentoken = md5(generateRandomString(10) . $now);

        $query = "select * from users where username = ? ";
        $stmt = $dbh->prepare($query);
        if($stmt->execute([
            $txt_username
        ])) {
            $num = $stmt->rowCount();
            if($num > 0) {
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $encpassword = md5($txt_password . $salt);
                    if($encpassword == $password) {
                        $userid = $id;

                        $query = 'update users set token = ? , last_login = ? where id = ?';
                        $stmt = $dbh->prepare($query);
                        if($stmt->execute([
                            $gentoken, $now , $userid
                        ])) {
                            $object = new stdClass();
                            $result = new stdClass();

                            $result->Fullname = $name;
                            $result->Token = $gentoken;
                            $result->role = $role;

                            $object->RespCode = 200;
                            $object->RespMessage = 'good';
                            $object->Result = $result;
                        }
                        else {
                            $object = new stdClass();
                            $object->RespCode = 400;
                            $object->RespMessage = 'bad';
                            $object->Log = 4;
                        }
                    }
                    else {
                        $object = new stdClass();
                        $object->RespCode = 400;
                        $object->RespMessage = 'bad';
                        $object->Log = 3;
                    }
                }
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
            $object->Log = 1;
        }
        echo json_encode($object);
        http_response_code(200);
    }
    else {
        http_response_code(405);
    }
?>