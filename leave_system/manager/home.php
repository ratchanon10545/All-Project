<?php
    session_start();
    require("../connection.php");

    if(!isset($_SESSION['manager_login'])){
        header("location : ../index.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300&display=swap" rel="stylesheet">
        <style>
            body div{
                font-family: 'Sarabun', sans-serif;
            }
            
        </style>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Home-Manager</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="../assets/favicon.ico" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="../css/styles.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    </head>
    <body>
        <?php 
            $stmt = $conn->prepare("SELECT * FROM line_users WHERE identicationNumber = :identicationNumber");
            $stmt->bindParam(':identicationNumber',$_SESSION['manager_login']);
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
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="home.php">หน้าหลัก</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="color.php">สีแต่ละแผนก</a>
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
                    $approval_accept = 1;
                    $approval_deny = 2;
                    $approval_wait = 0;
                    $stmt = $conn->prepare("SELECT id,status_manager FROM leave2 WHERE  approval=:approval AND boss=:session");
                    $stmt->bindParam(":approval",$approval_accept);
                    $stmt->bindParam(":session",$_SESSION['manager_session']);
                    $stmt->execute();
                    $rows_accpet = $stmt->fetchAll(PDO::FETCH_ASSOC);
                                                    
                    $stmt = $conn->prepare("SELECT id,status_manager FROM leave2 WHERE  approval=:approval AND boss=:session");
                    $stmt->bindParam(":approval",$approval_deny);
                    $stmt->bindParam(":session",$_SESSION['manager_session']);
                    $stmt->execute();
                    $rows_deny = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    $stmt = $conn->prepare("SELECT id,status_manager FROM leave2 WHERE  approval=:approval AND boss=:session");
                    $stmt->bindParam(":approval",$approval_wait);
                    $stmt->bindParam(":session",$_SESSION['manager_session']);
                    $stmt->execute();
                    $rows_wait = $stmt->fetchAll(PDO::FETCH_ASSOC);
                ?>
                <div class="container-fluid">
                    <div class="row p-5">
                            
                            <div class="col-lg-6 mb-4">
                                    <a href="leave_manager.php" style="text-decoration: none;">
                                    <div class="card bg-secondary text-white shadow">
                                        <div class="card-body" style="font-size: 25px;">
                                            รออนุมัติ
                                            <div class="text-white small"><?php echo count($rows_wait)?> ฉบับ</div>
                                            <?php 
                                                if(count($rows_wait)>0){ ?>
                                                   <?php foreach( $rows_wait as $row){ ?>
                                                        <?php if($row['status_manager'] == 0){ ?>
                                                            <span class="position-absolute top-0 start-100 translate-middle p-2  rounded-circle">
                                                                <i  class="fa-solid fa-bell fa-shake" style="color: #fa0000;font-size:35px;"></i>
                                                            </span>
                                                            <?php  break; ?>
                                                        <?php } ?>
                                                   <?php } ?>
                                            <?php  } ?>
                                        </div>
                                    </div>
                                    </a>
                            </div>
                            
                            <div class="col-lg-6 mb-4">
                                <a href="approval_accept.php" style="text-decoration: none;">
                                    <div class="card bg-success text-white shadow">
                                        <div class="card-body" style="font-size: 25px;">
                                            อนุมัติแล้ว
                                            <div class="text-white small"><?php echo count($rows_accpet)?> ฉบับ</div>
                                        </div>
                                        <?php 
                                                if(count($rows_accpet)>0){ ?>
                                                   <?php foreach( $rows_accpet as $row){ ?>
                                                        <?php if($row['status_manager'] == 0){ ?>
                                                            <span class="position-absolute top-0 start-100 translate-middle p-2  rounded-circle">
                                                                <i  class="fa-solid fa-bell fa-shake" style="color: #fa0000;font-size:35px;"></i>
                                                            </span>
                                                            <?php  break; ?>
                                                        <?php } ?>
                                                   <?php } ?>
                                            <?php  } ?>
                                    </div>
                                </a>
                                </div>
                                <div class="col-lg-6 mb-4">
                                    <a href="approval_deny.php" style="text-decoration: none;">
                                    <div class="card bg-danger text-white shadow">
                                        <div class="card-body" style="font-size: 25px;">
                                            ไม่อนุมัติ
                                            <div class="text-white small"><?php echo count($rows_deny)?> ฉบับ</div>
                                            <?php 
                                                if(count($rows_deny)>0){ ?>
                                                   <?php foreach( $rows_deny as $row){ ?>
                                                        <?php if($row['status_manager'] == 0){ ?>
                                                            <span class="position-absolute top-0 start-100 translate-middle p-2  rounded-circle">
                                                                <i  class="fa-solid fa-bell fa-shake" style="color: #fa0000;font-size:35px;"></i>
                                                            </span>
                                                            <?php  break; ?>
                                                        <?php } ?>
                                                   <?php } ?>
                                            <?php  } ?>
                                        </div>
                                    </div>
                                    </a>
                                </div>

                                <div class="col-lg-6 mb-4">
                                    <a href="calendar.php" style="text-decoration: none;">
                                    <div class="card bg-dark text-white shadow">
                                        <div class="card-body" style="font-size: 25px;">
                                            Calendar
                                            <div class="text-white small"> ปฏิทิน</div>
                                            
                                        </div>
                                    </div>
                                    </a>
                            </div>
                
                            </div>
                    </div>
            </div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        <!-- Core theme JS-->
        <script src="../js/scripts.js"></script>
    </body>
</html>
