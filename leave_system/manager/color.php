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
                
                <div class="container-fluid">
                <div class="row p-2">
                        <div class="col-sm-5">
                            <div class="card text-center p-4 " style="border: 8px solid #23FF00;">
                                Planner
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #0023FF;">
                                Forklift 
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #FB0B0B;">
                                Accounting
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #7800FF;">
                                วังน้อย
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #A5A967;">
                                คนขับหรือเด็กรถ6ล้อ
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #F3FF00;">
                                Checker
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #FF8000;">
                                LOG Innovation
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #00FBFF;">
                                Business Development
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #5DAA9E;">
                                คนขับหรือเด็กรถ4ล้อ
                            </div>
                            <div class="card text-center p-4 mt-2" style="border: 8px solid #284544;">
                                คนขับ18ล้อ
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
