<?php
    session_start();
    require("../connection.php");

    if(!isset($_SESSION['user_login'])){
        header("location : ../index.php");
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
        <link href="../css/badge.css" rel="stylesheet" />
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
                        $approval = 1;
                        $sql = "SELECT id,empid,position,name,status_user FROM leave2 WHERE approval = :approval AND empid = :id";
                        
                        if(isset($_GET['search'])){
                            if($_GET['search'] == 1){
                                $sql .= " AND type = 1 ";
                                
                            }
                            else if($_GET['search'] == 2){
                                $sql .= " AND type = 2 ";
                            }
                            else if($_GET['search'] == 3){
                                $sql .= " AND type = 3 ";
                            }
                            
                        }
                        $sql .= " ORDER BY id DESC";


                        $stmt = $conn -> prepare($sql);

                        $stmt->bindParam(':approval',$approval);
                        $stmt->bindParam(':id',$_SESSION['user_login']);
                        $stmt->execute();
                        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        
                ?>
                <div class="container-fluide ">
                        <a href="home.php"><i class="fa-solid fa-angle-left" style="color: #050505; font-size:20px; padding-top:5px; padding-left:10px;"></i></a>
                </div>
                <div class="container-fluid p-4">
                    <form  method="get">
    
                        <div class="form-group row">
                            <div class="col-10 col-sm-4">
                    
                                <select name="search" type="submit" class="form-control" >
                                    <option  value="">-เลือกประเภทการลา-</option>
                                    <option  value="1">-ลาป่วย</option>
                                    <option value="2">-ลากิจ</option>
                                    <option  value="3">-ลาพักผ่อน</option>
                                </select>
                                <button type="submit"class="btn btn-danger mt-2" >ค้นหา</button>
                    </div>
                    </div>
                   </form>
                   <hr>
                   
                    <?php foreach($rows as $row): ?>
                        
                        <?php $encode = base64_encode($row['id']); ?>
                        <?php 
                         if($row['position']== "Planner"){
                            $color = "#23FF00";
                         }
                         else if($row['position']== "Checker"){
                            $color = "#F3FF00";
                         } 
                         else if($row['position']== "Forklift"){
                            $color = "#0023FF";
                         }
                         else if($row['position']== "Accounting"){
                            $color = "#FB0B0B";
                         }
                         else if($row['position']== "LOG Innovation"){
                            $color = "#FF8000";
                         }
                         else if($row['position']== "Business Development"){
                            $color = "#00FBFF";
                         }
                         else if($row['position']== "วังน้อย"){
                            $color = "#7800FF";
                         }
                         else if($row['position']== "คนขับหรือเด็กรถ4ล้อ"){
                            $color = "#5DAA9E";
                         }
                         else if($row['position']== "คนขับหรือเด็กรถ6ล้อ"){
                            $color = "#A5A967";
                         }
                        else{
                            $color = "#284544";
                        }
                        ?>
                        <div class="col-xl-3 col-md-6 mb-4">
                        <a href="show_leave.php?d=<?php echo $encode ?>" style="text-decoration: none;">
                            <div class="card shadow h-100 py-2" style="border:4px solid <?php echo $color ?>;border-radius:20px ">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text text-uppercase mb-1">
                                                <?php echo $row['empid'] ?></div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800"><?php echo $row['name'] ?></div>
                                            <?php if($row['status_user'] == 0) { ?>
                                                <div class="price-container">
                                                    <div class="price">
                                                        <span class="number">NEW</span>
                                                        
                                                    </div>
                                                </div>
                                            <?php } ?>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa-regular fa-circle-check" style="color: #1fe540; font-size:40px;"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        </div>
                        
                    <?php endforeach ?>
                </div>
            </div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        <!-- Core theme JS-->
        <script src="../js/scripts.js"></script>
    </body>
</html>
