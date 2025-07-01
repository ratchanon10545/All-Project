<?php  
    session_start();
    require("../connection.php");
    
    if(isset($_POST['save'])){
        $id = $_POST['id'];
        $type = intval($_POST['leave_type']);
        $boss = intval($_POST['leave_boss']);
        $name = $_POST['emp_name'];
        $position = $_POST['emp_position'];
        $leave_reason = $_POST['leave_reason'];
        $leave_day_begin = $_POST['leave_day_begin'];
        $leave_day_end = $_POST['leave_day_end'];
        $leave_day_total = $_POST['leave_day_total'];
        $leave_day_come = $_POST['leave_day_come'];
        $encodeempid = base64_encode($_SESSION['user_login']);
        $encodeid = base64_encode($id);
       


                try{

                    $stmt = $conn->prepare("UPDATE leave2 SET type=:type, boss=:boss, name=:name, position=:position, leave_reason=:leave_reason, leave_day_begin=:leave_day_begin, leave_day_end=:leave_day_end,
                                            leave_day_total=:leave_day_total, leave_day_come=:leave_day_come       
                                            WHERE id = :id");
                    $stmt->bindParam(":id",$id);                        
                    $stmt->bindParam(":type",$type);
                    $stmt->bindParam(":boss",$boss);
                    $stmt->bindParam(":name",$name);
                    $stmt->bindParam(":position",$position);
                    $stmt->bindParam(":leave_reason",$leave_reason);
                    $stmt->bindParam(":leave_day_begin",$leave_day_begin);
                    $stmt->bindParam(":leave_day_end",$leave_day_end);
                    $stmt->bindParam(":leave_day_total",$leave_day_total);
                    $stmt->bindParam(":leave_day_come",$leave_day_come);
                    $stmt->execute();


                    header("location: show_leave.php?d=$encodeid");
                }
                catch(PDOException $e){
                    echo $e->getMessage();
                }
            
        
    }