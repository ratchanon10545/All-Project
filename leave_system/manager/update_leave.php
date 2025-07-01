<?php
    session_start();
    require("../connection.php");       
    if(isset($_POST['accept'])){
        $approval = 1;
        $status_reset = 0;
        $id = intval($_POST['id']);
        $encode = $_GET['d'];
        $leave_day_total = intval($_POST['leave_day_total']);
        $leave_type = intval($_POST['leave_type']);
        $empid = $_POST['empid'];

        $stmt = $conn->prepare("UPDATE leave2 SET approval=:approval,status_user=:status_user,status_manager=:status_manager WHERE id=:id");
        $stmt->bindParam(":id",$id);
        $stmt->bindParam(":approval",$approval);
        $stmt->bindParam(":status_user",$status_reset);
        $stmt->bindParam(":status_manager",$status_reset);
        $stmt->execute();

        $stmt2 = $conn->prepare("SELECT sick_leave,business_leave,vacation_leave FROM line_users WHERE identicationNumber = :identicationNumber");
        $stmt2->bindParam(':identicationNumber',$empid);
        $stmt2->execute();
        $roww = $stmt2->fetch(PDO::FETCH_ASSOC);

        if($leave_type == 1){
            $diff = $roww['sick_leave'] + $leave_day_total;
            $stmt3 = $conn->prepare("UPDATE line_users SET sick_leave = :sick_leave WHERE identicationNumber = :identicationNumber");
            $stmt3->bindParam(":sick_leave",$diff);
            $stmt3->bindParam(':identicationNumber',$empid);
            $stmt3->execute();
            

        }
        else if($leave_type == 2){
            $diff = $roww['business_leave'] + $leave_day_total;
            
            $stmt3 = $conn->prepare("UPDATE line_users SET business_leave = :business_leave WHERE identicationNumber = :identicationNumber" );
            $stmt3->bindParam(":business_leave",$diff);
            $stmt3->bindParam(':identicationNumber',$empid);
            $stmt3->execute();
            
        }
        else if($leave_type == 3){
            $diff = $roww['vacation_leave'] + $leave_day_total;
            
            $stmt3 = $conn->prepare("UPDATE line_users SET vacation_leave = :vacation_leave WHERE identicationNumber = :identicationNumber" );
            $stmt3->bindParam(":vacation_leave",$diff);
            $stmt3->bindParam(':identicationNumber',$empid);
            $stmt3->execute();
            
        }

        header("location: leave_manager.php");
    }
    else if(isset($_POST['deny'])){
        try{
            $approval = 2;
            $status_reset = 0;
            $id = intval($_POST['id']);
            $empid = $_POST['empid'];
            $leave_day_total = intval($_POST['leave_day_total']);
            $leave_type = intval($_POST['leave_type']);
            $reason = ($_POST['reason']);
            

            $stmt = $conn->prepare("UPDATE leave2 SET approval=:approval,status_user=:status_user,status_manager=:status_manager WHERE id=:id");
            $stmt->bindParam(":id",$id);
            $stmt->bindParam(":approval",$approval);
            $stmt->bindParam(":status_user",$status_reset);
            $stmt->bindParam(":status_manager",$status_reset);
            $stmt->execute();

            $stmt2 = $conn->prepare("INSERT INTO deny(leave_id,reason) VALUE (:leave_id,:reason)");
            $stmt2->bindParam(':leave_id',$id);
            $stmt2->bindParam(':reason',$reason);
            $stmt2->execute();

            

            
            
            header("location: leave_manager.php");
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    else{
        header("location: leave_manager.php");
    }