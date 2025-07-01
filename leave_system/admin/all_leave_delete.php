<?php   
    session_start();
    require('../connection.php');

    if(isset($_POST['delete'])){
        $id = $_POST['id'];
        try{
            $sql = "DELETE FROM leave2 WHERE id=$id" ;
            $conn->exec($sql);
            header("location:all_leave.php");

        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }