<?php 
    session_start();
    require("connection.php");

    

    if(isset($_POST['submit'])){
        $identicationNumer = $_POST['IdentificationNumber'];
        $userid = $_POST['userId'];
        $name = $_POST['name'];
        $imgUrl = $_POST['imgUrl'];
        $role = 'user';
        $sick_leave = 0;
        $business_leave = 0;
        $vacation_leave = 0;
        $session = 0;
        if(empty($_POST['IdentificationNumber'])){
            $_SESSION['error'] = 'กรุณาใส่เลขบัตรประชาชน';
            header("location: index.php");
        }
        else if(strlen($identicationNumer) < 13 || strlen($identicationNumer) > 13){
            $_SESSION['error']="กรุณาใส่เลขบัตรประชาชนให้ถูกต้อง ไม่น้อยกว่า 13 หรือ มากกว่า 13 ตัว";
            header("location: index.php");
        }
        else{
            try{
                $check = $conn->prepare("SELECT identicationNumber,role,session FROM line_users WHERE userid=:userid");
                $check->bindParam(':userid',$userid);
                $check->execute();
                $rows = $check->fetch(PDO::FETCH_ASSOC);
                /*$reset = $conn->prepare("CALL reset(:sick_leave,:business_leave,:vacation_leave)");
                $reset->bindParam(':sick_leave',$sick_leave);
                $reset->bindParam(':business_leave',$business_leave);
                $reset->bindParam(':vacation_leave',$vacation_leave);
                $reset->execute();*/
                if($check->rowCount() > 0){
                    if($identicationNumer == $rows['identicationNumber']){
                        if($rows['role'] == 'user'){
                            $_SESSION['user_login'] = $rows['identicationNumber'] ;
                            setcookie('IdentificationNumber', $identicationNumer, time()+(10*365*24*60*60));
                            header('location: ./user/home.php');
                        }
                        else if($rows['role'] == 'manager'){
                            $_SESSION['manager_login'] = $rows['identicationNumber'] ;
                            $_SESSION['manager_session'] = $rows['session'] ;
                            setcookie('IdentificationNumber', $identicationNumer, time()+(10*365*24*60*60));
                            header('location: ./manager/home.php');
                        }
                        
                    }
                    else{
                        $_SESSION['error'] = "เลขบัตรประชาชนผิด";
                        header('location: index.php');
                    }
                }
                else{
                    $stmt = $conn->prepare("INSERT INTO line_users(identicationNumber, userid, name, imgUrl, role, session ,sick_leave, business_leave, vacation_leave) 
                                            VALUE (:identicationNumber, :userid, :name, :imgUrl, :role, :session,:sick_leave, :business_leave, :vacation_leave) ");
                    $stmt->bindParam(':identicationNumber',$identicationNumer);
                    $stmt->bindParam(':userid',$userid);
                    $stmt->bindParam(':name',$name);
                    $stmt->bindParam(':imgUrl',$imgUrl);
                    $stmt->bindParam(':role',$role);
                    $stmt->bindParam(':session',$session);
                    $stmt->bindParam(':sick_leave',$sick_leave);
                    $stmt->bindParam(':business_leave',$business_leave);
                    $stmt->bindParam(':vacation_leave',$vacation_leave);
                    $stmt->execute();
                    $_SESSION['user_login'] = $identicationNumer ;
                    setcookie('IdentificationNumber', $identicationNumer, time()+(10*365*24*60*60));
                    header('location: ./user/home.php');
                }

            }catch(PDOException $e){
                echo $e->getMessage();
            }
            
        }
    }
?>
