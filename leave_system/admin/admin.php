<?php
    session_start();
    require('../connection.php');

    if(!isset($_SESSION['admin_login'])){
        $_SESSION['error'] = "กรุณาlogin";
        header("location:../login_admin.php");
    }
    if(isset($_GET['act'])){
        if($_GET['act']== 'excel'){
            header("Content-Type: application/xls");
            header("Content-Disposition: attachment; filename=users.xls");
            header("Pragma: no-cache");
            header("Expires: 0");
        }
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
                <div class="container-fluid">
                    <h1 class="mt-4">Users</h1>
                    <p>
						<a href="?act=excel" class="btn btn-primary"> Export->Excel </a>
					</p>
                    <hr>
                    <form  method="get">
                        <div class="form-group row">
                            <div class="col-10 col-sm-5 p-2"> 
                                
                                <input type="text" name="id"  class="form-control" style="border-radius: 10px;" placeholder="ค้าหาจากid">
                                <input type="text" name="name" class="form-control" style="border-radius: 10px;" placeholder="ค้าหาจากชื่อ">
                                <button type="submit" name="search" class="btn btn-danger mt-2" >ค้นหา</button>
                            </div>
                        </div>
                   </form>
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">img</th>
                                <th scope="col">Id</th>
                                <th scope="col">name</th>
                                <th scope="col">role</th>
                                <th scope="col">department</th>
                                <th scope="col">sick_leave</th>
                                <th scope="col">business_leave</th>
                                <th scope="col">vacation_leave</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <?php 
                            $sql = "SELECT * FROM line_users";
                            if(isset($_GET['search'])){
                                if(!empty($_GET['id'])){
                                    $searchid = $_GET['id'];
                                    $sql .= " WHERE identicationNumber LIKE CONCAT('%', :id , '%') ";

                                    if(!empty($_GET['name'])){
                                        $searchname = $_GET['name'];
                                        $sql .= " AND name LIKE CONCAT('%', :name , '%')";
                                        
                                    }
                                }
                                else if(!empty($_GET['name'])){
                                    $searchname = $_GET['name'];
                                    $sql .= " WHERE name LIKE CONCAT('%', :name , '%')";
                                    
                                }
                                
                            }
                            
                            $stmt = $conn->prepare($sql);
                            if(!empty($_GET['id'])){
                                $stmt->bindParam(':id' , $searchid);
                                
                            }
                            if(!empty($_GET['name'])){
                                $stmt->bindParam(':name' ,$searchname);
                                
                            }
                            $stmt->execute();
                            $rows=$stmt->fetchAll(PDO::FETCH_ASSOC);

                            
                        ?>
                        <?php foreach($rows as $row): ?>
                            <tbody class="text-center">
                                <tr >
                                    <td style="width: 10%;"><img style="width: 50%;" src="<?php echo $row['imgUrl'] ?>" alt=""></td>
                                    <td><?php echo $row['identicationNumber'] ?></td>
                                    <td><?php echo $row['name'] ?></td>
                                    <td><?php echo $row['role'] ?></td>
                                    <td><?php echo $row['session'] ?></td>
                                    <td><?php echo $row['sick_leave'] ?></td>
                                    <td><?php echo $row['business_leave'] ?></td>
                                    <td><?php echo $row['vacation_leave'] ?></td>
                                    <td>
                                        <a href="#" class="btn btn-success" onclick="openForm_change('<?php echo $row['identicationNumber'] ?>','<?php echo $row['name'] ?>','<?php echo $row['role'] ?>','<?php echo $row['session'] ?>','<?php echo $row['userid'] ?>','<?php echo $row['sick_leave'] ?>'
                                                                                    ,'<?php echo $row['business_leave'] ?>','<?php echo $row['vacation_leave'] ?>')">แก้ไข</a>
                                        <a href="#" class="btn btn-danger" name="delete"  id="userid" onclick="openForm('<?php echo $row['identicationNumber'] ?>','<?php echo $row['userid'] ?>','<?php echo $row['name'] ?>')">ลบ</a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        
                        <?php endforeach ?>
                    </table>
                    <!-- Form change-->
                    <!-- The Modal -->
                    <div id="myModal_change" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="Update">&times;</span>
                            <p style="font-size: 35px; font: weight 900px;">Update</p>
                            <hr>
                            <form action="update_user_db.php" method="post">
                                <input type="hidden" id="uid" name="userid" value="">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">identicationNumber</label>
                                    <input type="text" class="form-control" id="identicationNumber" aria-describedby="emailHelp" name="identicationNumber" value="">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">name</label>
                                    <input type="text" class="form-control" id="name_update" name="name" value="">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">role</label>
                                    <select name="role" class="form-control"  >
                                        <option id="role" value=""></option>
                                        <option  value="user">-user</option>
                                        <option  value="manager">-manager</option>
                                    </select>
                                    <!--<input type="text" class="form-control" id="role" name="role" value=""> -->
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">department</label>
                                    <input type="text" class="form-control" id="session" name="session" value="">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">sick_leave</label>
                                    <input type="text" class="form-control" id="sick_leave" name="sick_leave" value="">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">business_leave</label>
                                    <input type="text" class="form-control" id="business_leave" name="business_leave" value="">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">vacation_leave</label>
                                    <input type="text" class="form-control" id="vacation_leave" name="vacation_leave" value="">
                                </div>
                                <button type="submit" name="submit" class="btn btn-primary">บันทึก</button>
                            </form>
                            
                        </div>

                    </div>

                    <!-- Form Delete-->
                    <!-- The Modal -->
                    <div id="myModal" class="modal">

                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <p style="font-size: 40px; font: weight 900px;">Delete</p>
                            <hr>
                            <?php echo '<p id="id"></p>' ?>
                            <?php echo '<p id="name"></p>' ?>
                            <form action="delete_user.php" method="post">
                                <input type="hidden" name="idNumber" id="idNumber" value="">
                                <button type="submit" name="delete" class="btn btn-danger">ตกลง</button>
                            </form>
                            
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
