<?php

    session_start();
    require("connection.php");


    if(isset($_POST["signup"])){
        $username = $_POST["username"];
        $password = $_POST["password"];
        $role = "user";

        if (empty($username)){
            $_SESSION['error'] = "กรุณากรอก username";
            header("location: login_admin.php");
        }
        
        else if (empty($password)){
            $_SESSION['error'] = "กรุณากรอกรหัสผ่าน";
            header("location: login_admin.php");
        }
        else if (strlen($_POST['password'])>20 || strlen($_POST['password'])<5){
            $_SESSION['error'] = "รหัสผ่านต้องมีความยาว 5 ถึง 20ตัวอักษร";
            header("location: login_admin.php");
        }
        else{
            try{
                $check_email = $conn->prepare("SELECT username FROM admin2 WHERE username = :username");
                $check_email->bindParam(":username" , $username);
                $check_email->execute();
                $row = $check_email->fetch(PDO::FETCH_ASSOC);

                if($row['username'] == $username){
                    $_SESSION['warning'] = "มีอีเมลนี้อยู่ในระบบแล้ว <a href='login_admin.php'>คลิ๊กที่นี่</a>เพื่อเข้าสู่ระบบ";
                    header("location: register.php");
                }
                else if (!isset($_SESSION['error'])){
                    $passwordHash = password_hash($password , PASSWORD_DEFAULT);
                    $stmt = $conn -> prepare("INSERT INTO admin2(username,password,role)
                                             VALUES (:username, :password, :role)");
                    $stmt->bindParam(":username", $username);
                    $stmt->bindParam(":password", $passwordHash);
                    $stmt->bindParam(":role", $role);
                    
                    $stmt->execute();
                    $_SESSION['success'] = "สมัครสมาชิกเรียบร้อยแล้ว! <a href='login_admin.php' class='alert-link'>คลิ๊กที่นี่</a>เพื่อเข้าสู่ระบบ";
                    header("location: register.php");
                }
                else{
                    $_SESSION['error'] = "มีบางอย่างผิดพลาด";
                    header("location: login_admin.php");
                }
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }
    }
    $conn = null;
?>