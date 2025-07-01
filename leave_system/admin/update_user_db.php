<?php 

    session_start();
    require('../connection.php');

    if(isset($_POST['submit'])){
        $userid = $_POST['userid'];
        $identicationNumber = $_POST['identicationNumber'];
        $name = $_POST['name'];
        $role = $_POST['role'];
        $session = $_POST['session'];
        $sick_leave = $_POST['sick_leave'];
        $business_leave = $_POST['business_leave'];
        $vacation_leave = $_POST['vacation_leave'];

        try{

            $stmt = $conn->prepare("UPDATE line_users SET identicationNumber = :identicationNumber, name=:name, role = :role, session=:session
                                    ,sick_leave = :sick_leave, business_leave = :business_leave, vacation_leave =:vacation_leave     
                                     WHERE userid = :userid");
            $stmt->bindParam(":userid",$userid);                        
            $stmt->bindParam(":identicationNumber",$identicationNumber);
            $stmt->bindParam(":name",$name);
            $stmt->bindParam(":role",$role);
            $stmt->bindParam(":session",$session);
            $stmt->bindParam(":sick_leave",$sick_leave);
            $stmt->bindParam(":business_leave",$business_leave);
            $stmt->bindParam(":vacation_leave",$vacation_leave);
            $stmt->execute();
            header("location: admin.php");
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
    }
