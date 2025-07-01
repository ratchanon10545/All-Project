<?php
    session_start();
    require("../connection.php");

    if(isset($_POST["save"])){
        $empid = intval($_POST['empid']);
        $leave_type = intval($_POST['leave_type']);
        $leave_boss =intval($_POST['leave_boss']);
        $emp_name = $_POST['emp_name'];
        $emp_position = $_POST['emp_position'];
        $leave_reason = $_POST['leave_reason'];
        $leave_day_total = intval($_POST['leave_day_total']);
        $leave_day_begin = $_POST['leave_day_begin'];
        $leave_day_end = $_POST['leave_day_end'];
        $leave_day_come = $_POST['leave_day_come'];
        $approval = 0;
        $status_user = 0;
        $status_manager = 0;
        $encode = base64_encode($empid);

        
        

        if(empty($emp_name)){
            $_SESSION['error'] = 'กรุณาใส่ชื่อ';
            header("location: form.php?d=$encode");
        }
        else if(empty($emp_position)){
            $_SESSION['error'] = 'กรุณาใส่ตำแหน่ง';
            header("location: form.php?d=$encode");
        }
        else if(empty($leave_reason)){
            $_SESSION['error'] = 'กรุณาใส่สาเหตุการลา';
            header("location: form.php?d=$encode");
        }
        else if($leave_day_total <= 0){
            $_SESSION['error'] = 'กรุณากำหนดวันลาให้ถูกต้อง';
            header("location: form.php?d=$encode");
        }

        

        else{
            try{
                $stmt = $conn -> prepare("INSERT INTO leave2(empid, type, boss, name, position, leave_reason, leave_day_total, leave_day_begin, leave_day_end, leave_day_come,approval, status_user, status_manager)
                                             VALUES (:empid, :type, :boss, :name, :position, :leave_reason, :leave_day_total, :leave_day_begin, :leave_day_end, :leave_day_come, :approval, :status_user, :status_manager)");
                $stmt->bindParam(":empid",$empid);
                $stmt->bindParam(":type",$leave_type);
                $stmt->bindParam(":boss",$leave_boss);
                $stmt->bindParam(":name",$emp_name);
                $stmt->bindParam(":position",$emp_position);
                $stmt->bindParam(":leave_reason",$leave_reason);
                $stmt->bindParam(":leave_day_total",$leave_day_total);
                $stmt->bindParam(":leave_day_begin",$leave_day_begin);
                $stmt->bindParam(":leave_day_end",$leave_day_end);
                $stmt->bindParam(":leave_day_come",$leave_day_come);
                $stmt->bindParam(":approval",$approval);
                $stmt->bindParam(":status_user",$status_user);
                $stmt->bindParam(":status_manager",$status_manager);
                $stmt->execute();

                

                $_SESSION['success'] = "บันทึกเรียบร้อยแล้ว! <a href='../user/home.php' class='alert-link'>คลิ๊กที่นี่</a>เพื่อกลับหน้าหลัก";
                header("location: form.php?d=$encode");
            }
            catch(PDOException $e){
                echo $e->getMessage();
            }
        }
    }
?>