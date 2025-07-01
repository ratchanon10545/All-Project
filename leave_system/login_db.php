<?php

    session_start();
    require("connection.php");
    

    if(isset($_POST["login"])){
        $username = $_POST["username"];
        $password = $_POST["password"];
        

        
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
                $check = $conn->prepare("SELECT * FROM admin2 WHERE username = :username");
                $check->bindParam(":username" , $username);
                $check->execute();
                $row = $check->fetch(PDO::FETCH_ASSOC);
                if($check->rowCount() > 0){
                    if(password_verify($password,$row['password'])){
                        if($row['role'] == 'admin'){
                            $_SESSION['admin_login'] = $row['id'];
                            header("location:./admin/admin.php");
                        }
                    }
                }
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }
    }
$conn = null;
?>