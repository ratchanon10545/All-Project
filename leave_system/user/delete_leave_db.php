<?php   
    session_start();
    require('../connection.php');
    
    if(isset($_POST['delete'])){
        $id = $_POST['id'];
        $approval =intval($_POST['approval']);
        $type = intval($_POST['type']);
        $leave_day_total = intval($_POST['leave_day_total']);
        try{
            $sql = "DELETE FROM leave2 WHERE id=$id" ;
            $conn->exec($sql);
            $stmt2 = $conn->prepare("SELECT sick_leave,business_leave,vacation_leave FROM line_users WHERE identicationNumber = :identicationNumber");
            $stmt2->bindParam(':identicationNumber',$_SESSION['user_login']);
            $stmt2->execute();
            $roww = $stmt2->fetch(PDO::FETCH_ASSOC);
            if($approval == 0){
                if($type == 1){
                    $diff = $roww['sick_leave'] + $leave_day_total;
                    $stmt = $conn->prepare("UPDATE line_users SET sick_leave = :sick_leave WHERE identicationNumber = :identicationNumber");
                    $stmt->bindParam(":sick_leave",$diff);
                    $stmt->bindParam(':identicationNumber',$_SESSION['user_login']);
                    $stmt->execute();

                }
                else if($type == 2){
                    $diff = $roww['business_leave'] + $leave_day_total;
                    $stmt = $conn->prepare("UPDATE line_users SET business_leave = :business_leave WHERE identicationNumber = :identicationNumber");
                    $stmt->bindParam(":business_leave",$diff);
                    $stmt->bindParam(':identicationNumber',$_SESSION['user_login']);
                    $stmt->execute();
                }
                else if($type == 3){
                    $diff = $roww['vacation_leave'] + $leave_day_total;
                    $stmt = $conn->prepare("UPDATE line_users SET vacation_leave = :vacation_leave WHERE identicationNumber = :identicationNumber");
                    $stmt->bindParam(":vacation_leave",$diff);
                    $stmt->bindParam(':identicationNumber',$_SESSION['user_login']);
                    $stmt->execute();
                }
                $link = 'leave_user.php';
            }
            else if($approval == 1){
                $link = 'approval_accept.php';
            }
            else if($approval == 2){
                $link = 'approval_deny.php';
            }
            header("location:$link");

        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }