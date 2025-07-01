<?php   
    session_start();
    require('../connection.php');

    if(isset($_POST['delete'])){
        $id = $_POST['idNumber'];
        try{
            $sql = "DELETE FROM line_users WHERE identicationNumber=$id" ;
            $conn->exec($sql);
            header("location:admin.php");

        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }