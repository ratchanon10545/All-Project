<?php
    session_start();
    require("../connection.php");

    if(!isset($_SESSION['user_login'])){
        header("location : ../index.php");
    }
    if(isset($_GET['d'])){
        $status_user = 1;
        $id = base64_decode($_GET['d']);
        $sql = $conn->prepare("UPDATE leave2 SET status_user = :status_user WHERE id=:id");
        $sql->bindParam(":status_user",$status_user);
        $sql->bindParam(":id",$id);
        $sql->execute();
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
         <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.8/dist/sweetalert2.all.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.8/dist/sweetalert2.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300&display=swap" rel="stylesheet">
        <style>
            body label{
                font-family: 'Sarabun', sans-serif;
            }
            body input{
                font-family: 'Sarabun', sans-serif;
            }
            body select{
                font-family: 'Sarabun', sans-serif;
            }
            body div{
                font-family: 'Sarabun', sans-serif;
            }
        </style>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Home-User</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="../assets/favicon.ico" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="../css/styles.css" rel="stylesheet" />
        <link href="../css/admin.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    </head>
    <body>
        <?php 
            $stmt = $conn->prepare("SELECT * FROM line_users WHERE identicationNumber = :identicationNumber");
            $stmt->bindParam(':identicationNumber',$_SESSION['user_login']);
            $stmt->execute();
            $rows=$stmt->fetch(PDO::FETCH_ASSOC);

        ?>
        <div class="d-flex" id="wrapper">
            <!-- Sidebar-->
            <div class="border-end bg-white" id="sidebar-wrapper">
                <div class="sidebar-heading border-bottom bg-light"></div>
                <div class="list-group list-group-flush text-center">
                    <img width="60%" style="margin-left: 3rem; padding:1rem; " src="<?php echo $rows['imgUrl'] ?>" alt="..." class="img-responsive center-block rounded-circle" />
                    <p><?php echo $rows['identicationNumber'] ?></p>
                    <p><?php echo $rows['name'] ?></p>
                    
                </div>
               
            </div>
            <!-- Page content wrapper-->
            <div id="page-content-wrapper">
                <!-- Top navigation-->
                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div class="container-fluid">
                        <button class="btn btn-light" id="sidebarToggle"><span class="navbar-toggler-icon"></span></button>
                        
                    </div>
                </nav>
                <!-- Page content-->
                <?php 
                        $id = base64_decode($_GET['d']);
                        $stmt = $conn -> prepare("SELECT type,boss,name,position,leave_reason,leave_day_total,leave_day_begin,leave_day_end,leave_day_come,approval
                                                    FROM leave2 WHERE id = :id");
                        $stmt->bindParam(":id", $id);
                        $stmt->execute();
                        $rows = $stmt->fetch(PDO::FETCH_ASSOC);
                        if($rows['type'] == 1){
                            $type_value = "ลาป่วย";
                        }
                        else if($rows['type'] == 2){
                            $type_value = "ลากิจ";
                        }
                        else{
                            $type_value = "ลาพักร้อน";
                        }
                        if($rows['boss'] ==1){
                            $boss_value = "Mr.Warut";
                        }
                        else if(($rows['boss'] ==2)){
                            $boss_value = "Mr.Siripong";
                        }
                        else if(($rows['boss'] ==3)){
                            $boss_value = "Mr.Wachira";
                        }
                        else{
                            $boss_value = "Mr.Anusit";
                        }
                    ?>
                    <?php 
                        if($rows['approval'] == 0){
                            $link = 'leave_user.php';
                        }
                        else if($rows['approval'] == 1){
                            $link = 'approval_accept.php';
                        }
                        else if($rows['approval'] == 2){
                            $link = 'approval_deny.php';
                        }
                    ?>
                <div class="container-fluide ">
                    <a href="<?php echo $link ?>"><i class="fa-solid fa-angle-left" style="color: #050505; font-size:20px; padding-top:5px; padding-left:10px;"></i></a>
                </div>
                <div class="container-fluid pt-5">
                        <?php if(isset($_SESSION["error"])):?>
                            <div class="alert alert-danger" role="alert">
                                <?php
                                    echo $_SESSION['error'];
                                    unset($_SESSION['error']);
                                ?>
                            </div>
                        <?php endif ?>
                    <div class="form-group row p-2">
                        <label class="col-2 col-sm-2" >
                            ประเภท
                        </label>
                        <div class="col-10 col-sm-4">
                        <input type="text" name="leave_type"  readonly class="form-control" value="<?php echo $type_value ?>">
                        </div>
                    </div>
                    <div class="form-group row p-2">
                        <label class="col-2 col-sm-2" >
                            เรียน
                        </label>
                        <div class="col-10 col-sm-4">
                            <input type="text" name="leave_boss"  readonly class="form-control" value="<?php echo $boss_value ?>">
                        </div>
                    </div>
                    <div class="form-group row p-2">
                        <label class="col-2 col-sm-2" >
                            ข้าพเจ้า
                        </label>
                        <div class="col-10 col-sm-4">
                        <input type="text" name="leave_boss"  readonly class="form-control" value="<?php echo $rows['name'] ?>">
                        </div>
                        
                    </div>
                    <div class="form-group row p-2">
                        
                        <label class="col-2 col-sm-1" >
                            แผนก
                        </label>
                        <div class="col-10 col-sm-4">
                        <input type="text" name="leave_boss"  readonly class="form-control" value="<?php echo $rows['position'] ?>">
                        </div>
                    </div>
                    <div class="form-group row p-2">
                        <label class="col-2 col-sm-2" >
                            เนื่องด้วย
                        </label>
                        <div class="col-10 col-sm-5">
                            <textarea name="leave_reason" class="form-control" readonly ><?php echo $rows['leave_reason'] ?></textarea>
                        </div>
                    </div>
                    
                    <div class="form-group row p-2">
                        <label class="col-sm-2" >
                            ตั้งแต่
                        </label>
                        <div class="col-sm-3">
                            <input type="date" name="leave_day_begin"  readonly  class="form-control" value="<?php echo $rows['leave_day_begin'] ?>">
                        </div>
                        <label class="col-sm-1" >
                            ถึง
                        </label>
                        <div class="col-sm-3">
                            <input type="date" name="leave_day_end"  readonly  class="form-control" value="<?php echo $rows['leave_day_end'] ?>">
                        </div>
                    </div>
                    <div class="form-group row p-2">
                        <label class="col-2 col-sm-2" >
                            กำหนด
                        </label>
                        <div class="col-3 col-sm-2">
                            <input type="number" name="leave_day_total"  required min="0" readonly class="form-control" value="<?php echo $rows['leave_day_total'] ?>">
                        </div>
                        <label class="col-1 col-sm-1">
                            วัน
                        </label>
                    </div>
                    <div class="form-group row p-2">
                        <label class="col-sm-2" >
                            กลับมาทำงานวันที่
                        </label>
                        <div class="col-sm-5">
                            <input type="date" name="leave_day_end"  readonly  class="form-control" value="<?php echo $rows['leave_day_come'] ?>">
                        </div>
                    </div>
                    <hr>
                    <?php if($rows['approval']==0) :?>
                    <form action="update_leave.php" method="post">
                        <input type="hidden" name='id' value="<?php echo $id?>">
                
                        <div class="form-group row">
                            <label class="col-sm-2">
                            </label>
                            <div class="col-sm-3">
                                <button type="submit" class="btn btn-primary" name="change" style="width: 100%">แก้ไขข้อมูล</button>
                            </div>
                        </div>
                    </form>
                    
                    
                    <?php endif ?>

                    <?php if($rows['approval']==2) :?>
                    <?php 
                        $stm = $conn->prepare("SELECT * FROM deny WHERE leave_id = :id");
                        $stm->bindParam(":id",$id);
                        $stm->execute();
                        $rows_deny = $stm->fetch(PDO::FETCH_ASSOC);
                    ?>
                    <p>ไม่อนุมัติเพราะ</p>
                        <div class="form-group row p-2">
                                    
                            <div class="col-10 col-sm-5">
                                <textarea name="reason"  readonly class="form-control"><?php echo $rows_deny['reason'] ?></textarea>
                            </div>
                        </div>
                    
                    
                    <?php endif ?>
                    <?php if($rows['approval'] != 1) : ?>
                    <div class="form-group row pt-2">
                            <label class="col-sm-2">
                            </label>
                            <div class="col-sm-3">
                                <button type="button" onclick="openForm()" class="btn btn-danger" name="delete" style="width: 100%">ลบ</button>
                            </div>
                    </div>
                    <?php endif ?>
                    <!-- The Modal -->
                    <div id="myModal" class="modal">

                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <p style="font-size: 40px; font: weight 900px;">Delete</p>
                            <hr>
                            <p>ยืนยันการลบ</p>
                            
                            <form action="delete_leave_db.php" method="post">
                                <input type="hidden" name='id' value="<?php echo $id?>">
                                <input type="hidden" name="approval" value="<?php echo $rows['approval'] ?>">
                                <input type="hidden" name="type" value="<?php echo $rows['type'] ?>">
                                <input type="hidden" name="leave_day_total" value="<?php echo $rows['leave_day_total'] ?>">
                                <div class="form-group row pt-2">
                                    <label class="col-sm-2">
                                    </label>
                                    <div class="col-sm-3">
                                        <button type="submit" class="btn btn-danger" name="delete" style="width: 100%">ตกลง</button>
                                    </div>
                                </div>
                            </form>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        <!-- Core theme JS-->
        <script src="../js/scripts.js"></script>
        <script src="../js/popup.js"></script>
    </body>
</html>
