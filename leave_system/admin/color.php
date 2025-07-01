
<?php
    
    session_start();
    require('../connection.php');

    if(!isset($_SESSION['admin_login'])){
        $_SESSION['error'] = "กรุณาlogin";
        header("location:../login_admin.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Simple Sidebar - Start Bootstrap Template</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="../assets/favicon.ico" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="../css/styles.css" rel="stylesheet" />
        <link href="../css/admin.css" rel="stylesheet" />
        
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- JS for jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.8/dist/sweetalert2.all.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.8/dist/sweetalert2.min.css">
    
    <!-- bootstrap css and js -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="d-flex" id="wrapper">
            <!-- Sidebar-->
            <div class="border-end bg-white" id="sidebar-wrapper">
                <div class="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
                <div class="list-group list-group-flush">
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="admin.php">User</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="all_leave.php">leave</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="calendar.php">Calendar</a>
                    <a class="list-group-item list-group-item-action list-group-item-light p-3" href="color.php">color</a>
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
                <div class="container">
                    <div class="row p-2">
                        <div class="col-5">
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
                        <div class="col-5">
                            <div class="card text-center p-4" style="border: 8px solid #F3FF00;">
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

        

        </div>
        <script src="../js/admin.js"></script>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="../js/scripts.js"></script>
    </body>
</html>
