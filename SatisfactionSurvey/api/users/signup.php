<?php
    include '../config.php';
    require_once('../db.php');
    header("Access-Control-Allow-Origin:".$originURL);
    header("Access-Control-Allow-Headers: content-type");
    header("Content-Type: application/json; charset=UTF-8");
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

    if($_SERVER['REQUEST_METHOD'] == "POST") {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $fullname = $_POST['name'];
        $role = $_POST['role'];

        $salt = generateRandomString(10);
        $newpassword = md5($password . $salt);

        $now = date("Y-m-d H:i:s"); 
        $token = md5(generateRandomString(10) . $now);

        $query = "insert into users (username, password, salt, token, name , last_login ,role) values (?,?,?,?,?,?,?)";
        $stmt = $dbh->prepare($query);
        if($stmt->execute([
            $username, $newpassword, $salt, $token, $fullname,$now,$role
        ])) {
            $object = new stdClass();
            $object->RespCode = 200;
            $object->RespMessage = 'good';
            // $object->Token = $token;
            // $object->Fullname = $fullname;
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