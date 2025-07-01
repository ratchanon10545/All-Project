<?php
    session_start();
    if(!isset($_SESSION['admin_login'])){
        $_SESSION['error'] = "กรุณาlogin";
        header("location:../login_admin.php");
    }
    require('../connection.php');
    if(isset($_GET['act'])){
        if($_GET['act']== 'excel'){
            header("Content-Type: application/xls");
            header("Content-Disposition: attachment; filename=leave.xls");
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
        <link href="../css/admin_leave.css" rel="stylesheet" />
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
                    <h1 class="mt-4">ใบลาทั้งหมด</h1>
                    <p>
						<a href="?act=excel" class="btn btn-primary"> Export->Excel </a>
					</p>
                    <hr>
                    <form  method="get">
                        <div class="form-group row">
                            <div class="col-10 col-sm-5 p-2"> 
                                <select name="search" type="submit" class="form-control" >
                                    <option  value="">-เลือกประเภทการลา-</option>
                                    <option  value="1">-ลาป่วย</option>
                                    <option value="2">-ลากิจ</option>
                                    <option  value="3">-ลาพักผ่อน</option>
                                </select> 
                                <input type="text" name="id"    class="form-control" style="border-radius: 10px;" placeholder="ค้าหาจากเลข13หลัก">
                                <input type="text" name="name"  class="form-control" style="border-radius: 10px;" placeholder="ค้าหาจากชื่อ">
                                <?php 
                                    if(isset($_GET['page'])){
                                        $pv = $_GET['page'];
                                    }
                                    else{
                                        $pv = 1;
                                    }
                                ?>
                                <input type="hidden" name="page" value="<?php echo $pv ?>"> 
                                
                            </div>
                            <div class="col-10 col-sm-5 p-2">
                                <select name="level" type="submit" class="form-control" >
                                    <option  value="">-เรียง-</option>
                                    <option  value="1">-ใหม่ล่าสุด</option>
                                    <option value="2">-เก่าสุด</option>
                                </select> 
                            </div>
                            <div class="col-5">
                                <button type="submit"  class="btn btn-danger mt-2" >ค้นหา</button>
                            </div>
                            
                        </div>
                   </form>
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">empId</th>
                                <th scope="col">type</th>
                                <th scope="col">boss</th>
                                <th scope="col">name</th>
                                <th scope="col">position</th>
                                <th scop="col">leave_reason</th>
                                <th scop="col">leave_day_total</th>
                                <th scop="col">leave_day_begin</th>
                                <th scop="col">leave_day_end</th>
                                <th scop="col">leave_day_come</th>
                                <th scope="col">create_at</th>
                                <th scope="col">approval</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <?php
                            $perpage = 50;
                            if (isset($_GET['page'])) {
                                $page = $_GET['page'];
                            } else {
                                $page = 1;
                            }
                            $start = ($page - 1) * $perpage;

                            $sql ="SELECT * FROM leave2 ";
                            if(isset($_GET['search'])){
                                if($_GET['search'] == 1){
                                    $sql .= " WHERE type = 1 ";
                                    
                                    if(!empty($_GET['id'])){
                                        $searchid = $_GET['id'];
                                        $sql .= " AND empid LIKE CONCAT('%', :id , '%') ";
    
                                    }
                                    if(!empty($_GET['name'])){
                                        $searchname = $_GET['name'];
                                        $sql .= " AND name LIKE CONCAT('%', :name , '%')";
                                        
                                    }
                                }
                                else if($_GET['search'] == 2){
                                    $sql .= " WHERE type = 2 ";
                                    if(!empty($_GET['id'])){
                                        $searchid = $_GET['id'];
                                        $sql .= " AND empid LIKE CONCAT('%', :id , '%') ";
    
                                    }
                                    if(!empty($_GET['name'])){
                                        $searchname = $_GET['name'];
                                        $sql .= " AND name LIKE CONCAT('%', :name , '%')";
                                        
                                    }
                                }
                                else if($_GET['search'] == 3){
                                    $sql .= " WHERE type = 3 ";
                                    if(!empty($_GET['id'])){
                                        $searchid = $_GET['id'];
                                        $sql .= " AND empid LIKE CONCAT('%', :id , '%') ";
    
                                    }
                                    if(!empty($_GET['name'])){
                                        $searchname = $_GET['name'];
                                        $sql .= " AND name LIKE CONCAT('%', :name , '%')";
                                        
                                    }
                                }

                                else if(!empty($_GET['id'])){
                                    $searchid = $_GET['id'];
                                    $sql .= " WHERE empid LIKE CONCAT('%', :id , '%') ";

                                    if(!empty($_GET['name'])){
                                        $searchname = $_GET['name'];
                                        $sql .= " AND name LIKE CONCAT('%', :name , '%')";
                                        
                                    }
                                }
                                else if(!empty($_GET['name'])){
                                    $searchname = $_GET['name'];
                                    $sql .= " WHERE name LIKE CONCAT('%', :name , '%')";
                                    
                                }
                                if(!empty($_GET['level'])){
                                    if($_GET['level'] == 1){
                                        $searchlevel = $_GET['level'];
                                        $sql .= " ORDER BY create_at DESC ";
                                    }
                                    else if($_GET['level'] == 2){
                                        $searchlevel = $_GET['level'];
                                        $sql .= " ORDER BY create_at ASC ";
                                    }
                                }
                            }
                            $sql .= "limit {$start} , {$perpage}";

                            $stmt = $conn -> prepare($sql);
                            if(!empty($_GET['id'])){
                                    $stmt->bindParam(':id',$_GET['id']);
                                    
                            }
                            if(!empty($_GET['name'])){
                                    $stmt->bindParam(':name',$_GET['name']);
                                
                            }
                        
                            $stmt->execute();
                            $rows=$stmt->fetchAll(PDO::FETCH_ASSOC);

                            
                        ?>
                        <?php foreach($rows as $row): ?>
                            <?php
                                if($row['type'] == 1){
                                    $type_value = "ลาป่วย";
                                }
                                else if($row['type'] == 2){
                                    $type_value = "ลากิจ";
                                }
                                else{
                                    $type_value = "ลาพักร้อน";
                                }
                                if($row['boss'] ==1){
                                    $boss_value = "Mr.Warut";
                                }
                                else if(($row['boss'] ==2)){
                                    $boss_value = "Mr.Siripong";
                                }
                                else if(($row['boss'] ==3)){
                                    $boss_value = "Mr.Wachira";
                                }
                                else{
                                    $boss_value = "Mr.Anusit";
                                }
                                if($row['approval'] == 0){
                                    $approval_value = "รออนุมัติ";
                                }
                                else if($row['type'] == 1){
                                    $approval_value = "อนุมัติ";
                                }
                                else{
                                    $approval_value = "ไม่อนุมัติ";
                                }
                            ?>
                            <tbody class="text-center">
                                <tr >
                                    <td><?php echo $row['id'] ?></td>
                                    <td><?php echo $row['empid'] ?></td>
                                    <td><?php echo $type_value ?></td>
                                    <td><?php echo $boss_value ?></td>
                                    <td><?php echo $row['name'] ?></td>
                                    <td><?php echo $row['position'] ?></td>
                                    <td><?php echo $row['leave_reason'] ?></td>
                                    <td><?php echo $row['leave_day_total'] ?></td>
                                    <td><?php echo $row['leave_day_begin'] ?></td>
                                    <td><?php echo $row['leave_day_end'] ?></td>
                                    <td><?php echo $row['leave_day_come'] ?></td>
                                    <td><?php echo $row['create_at'] ?></td>
                                    <td><?php echo $approval_value ?></td>
                                    <td>
                                        <a href="#" onclick="openForm_change('<?php echo $row['id'] ?>','<?php echo $row['empid'] ?>','<?php echo $row['type'] ?>','<?php echo $row['boss'] ?>'
                                                                                ,'<?php echo $row['name'] ?>','<?php echo $row['position'] ?>','<?php echo $row['leave_reason'] ?>','<?php echo $row['leave_day_total'] ?>'
                                                                                ,'<?php echo $row['leave_day_begin'] ?>','<?php echo $row['leave_day_end'] ?>','<?php echo $row['leave_day_come'] ?>')" class="btn btn-success" >แก้ไข</a>
                                        <a href="#" onclick="openForm('<?php echo $row['id'] ?>')" class="btn btn-danger">ลบ</a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        <?php endforeach ?>
                    </table>
                    <?php
                        $sql2 = "SELECT id FROM leave2 ";
                        if(isset($_GET['search'])){
                            if($_GET['search'] == 1){
                                $sql2 .= " WHERE type = 1 ";
                                
                                if(!empty($_GET['id'])){
                                    $searchid = $_GET['id'];
                                    $sql2 .= " AND empid LIKE CONCAT('%', :id , '%') ";

                                }
                                if(!empty($_GET['name'])){
                                    $searchname = $_GET['name'];
                                    $sql2 .= " AND name LIKE CONCAT('%', :name , '%')";
                                    
                                }
                            }
                            else if($_GET['search'] == 2){
                                $sql2 .= " WHERE type = 2 ";
                                if(!empty($_GET['id'])){
                                    $searchid = $_GET['id'];
                                    $sql2 .= " AND empid LIKE CONCAT('%', :id , '%') ";

                                }
                                if(!empty($_GET['name'])){
                                    $searchname = $_GET['name'];
                                    $sql2 .= " AND name LIKE CONCAT('%', :name , '%')";
                                    
                                }
                            }
                            else if($_GET['search'] == 3){
                                $sql2 .= " WHERE type = 3 ";
                                if(!empty($_GET['id'])){
                                    $searchid = $_GET['id'];
                                    $sql2 .= " AND empid LIKE CONCAT('%', :id , '%') ";

                                }
                                if(!empty($_GET['name'])){
                                    $searchname = $_GET['name'];
                                    $sql2 .= " AND name LIKE CONCAT('%', :name , '%')";
                                    
                                }
                            }

                            else if(!empty($_GET['id'])){
                                $searchid = $_GET['id'];
                                $sql2 .= " WHERE empid LIKE CONCAT('%', :id , '%') ";

                                if(!empty($_GET['name'])){
                                    $searchname = $_GET['name'];
                                    $sql2 .= " AND name LIKE CONCAT('%', :name , '%')";
                                    
                                }
                            }
                            else if(!empty($_GET['name'])){
                                $searchname = $_GET['name'];
                                $sql2 .= " WHERE name LIKE CONCAT('%', :name , '%')";
                                
                            }
                        }
                        
                        $query2 = $conn -> prepare($sql2);
                        if(!empty($_GET['id'])){
                            $query2->bindParam(':id',$_GET['id']);
                            
                        }
                        if(!empty($_GET['name'])){
                                $query2->bindParam(':name',$_GET['name']);
                            
                        }
                        $query2->execute();
                        $total_record = $query2->rowCount();
                        $total_page = ceil($total_record / $perpage);
                        
                    ?>
                    <?php 
                        if(isset($_GET['search'])){
                            $search = $_GET['search'];
                        }
                        else{
                            $search = '';
                        }
                        if(isset($_GET['id'])){
                            $id = $_GET['id'];
                        }
                        else{
                            $id = '';
                        }
                        if(isset($_GET['name'])){
                            $name = $_GET['name'];
                        }
                        else{
                            $name = '';
                        }
                        if(isset($_GET['level'])){
                            $level = $_GET['level'];
                        }
                        else{
                            $level = '';
                        }
                    
                    ?>
                    <nav>
                        <ul class="pagination">
                            <li class="btn btn-light">
                                 <a href="all_leave.php?search=<?php echo $search ?>&id=<?php echo $id ?>&name=<?php echo $name ?>&page=1&level=<?php echo $level ?>" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <?php for($i=1;$i<=$total_page;$i++){ ?>
                                <li class="btn btn-light"><a href="all_leave.php?search=<?php echo $search ?>&id=<?php echo $id ?>&name=<?php echo $name ?>&page=<?php echo $i; ?>&level=<?php echo $level ?>"><?php echo $i; ?></a></li>
                            <?php } ?>
                            <li class="btn btn-light">
                                <a href="all_leave.php?search=<?php echo $search ?>&id=<?php echo $id ?>&name=<?php echo $name ?>&page=<?php echo $total_page;?>&level=<?php echo $level ?>" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                     <!-- The Modal -->
                     <div id="myModal_change" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="Update">&times;</span>
                            
                            <p style="font-size: 35px; font: weight 900px;">Update</p>
                            <hr>
                            <form action="all_leave_update.php" method="post">
                            <input type="hidden" id="id" name='id'>
                            <div class="form-group row p-2">
                                <label class="col-2 col-sm-2" >
                                    ประเภท
                                </label>
                                <div class="col-10 col-sm-4">
                                    <select name="leave_type" class="form-control" required>
                                        <option id="type" value=""></option>
                                        <option value="1">-ลาป่วย</option>
                                        <option value="2">-ลากิจ</option>
                                        <option value="3">-ลาพักร้อน</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row p-2">
                                <label class="col-2 col-sm-2" >
                                    เรียน
                                </label>
                                <div class="col-10 col-sm-4">
                                    <select name="leave_boss" class="form-control" required>
                                        <option id="boss" value=""></option>
                                        <option value="1">-Mr.Warut</option>
                                        <option value="2">-Mr.Siripong</option>
                                        <option value="3">-Mr.Wachira</option>
                                        <option value="4">-Mr.Anusit</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row p-2">
                                <label class="col-2 col-sm-2" >
                                    ข้าพเจ้า
                                </label>
                                <div class="col-10 col-sm-4">
                                    <input type="text" name="emp_name" class="form-control" id="name"></input>
                                </div>
                                
                            </div>
                            <div class="form-group row p-2">
                                <label class="col-2 col-sm-2" >
                                    แผนก
                                </label>
                                <div class="col-10 col-sm-4">
                                    <select name="emp_position" class="form-control" required>
                                        <option id="position" value=""></option>
                                        <option value="Planner">-Planner</option>
                                        <option value="Checker">-Checker</option>
                                        <option value="Forklift">-Forklift</option>
                                        <option value="Accounting">-Accounting</option>
                                        <option value="LOG Innovation">-LOG Innovation</option>
                                        <option value="Business Development">-Business Development</option>
                                        <option value="วังน้อย">-วังน้อย</option>
                                        <option value="คนขับหรือเด็กรถ4ล้อ">-คนขับหรือเด็กรถ4ล้อ</option>
                                        <option value="คนขับหรือเด็กรถ6ล้อ">-คนขับหรือเด็กรถ6ล้อ</option>
                                        <option value="คนขับ18ล้อ">-คนขับ18ล้อ</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row p-2">
                                <label class="col-2 col-sm-2" >
                                    เนื่องด้วย
                                </label>
                                <div class="col-10 col-sm-5">
                                    <textarea name="leave_reason" id="leave_reason" class="form-control" required ></textarea>
                                </div>
                            </div>
                            
                            <div class="form-group row p-2">
                                <label class="col-sm-2" >
                                    ตั้งแต่
                                </label>
                                <div class="col-sm-3">
                                    <input type="date" id="t1"  name="leave_day_begin"  required  class="form-control" >
                                </div>
                                <label class="col-sm-1" >
                                    ถึง
                                </label>
                                <div class="col-sm-3">
                                    <input type="date" id="t2"  name="leave_day_end"  required  class="form-control" >
                                </div>
                                
                            </div>
                            <div class="form-group row p-2">
                                
                                <label class="col-2 col-sm-2" >
                                    กำหนด
                                </label>
                                <div class="col-3 col-sm-2">
                                    <input type="number" name="leave_day_total" id="total" readonly class="form-control" >
                                </div>
                                <label class="col-1 col-sm-1" >
                                    วัน
                                </label>
                            </div>
                            <script>
                                document.getElementById("t1").addEventListener("change", function () {
                                
                                var t2 = new Date(document.getElementById("t2").value);
                                var t1 = new Date(document.getElementById("t1").value);
                                var t2_day = t2.getTime();
                                var t1_day = t1.getTime();

                                
                                var difference = Math.floor((t2-t1)/(24*3600*1000));
                                
                                document.getElementById('total').value = difference+1;
                                
                                });
                                document.getElementById("t2").addEventListener("change", function () {
                                
                                    var t2 = new Date(document.getElementById("t2").value);
                                    var t1 = new Date(document.getElementById("t1").value);
                                    var t2_day = t2.getTime();
                                    var t1_day = t1.getTime();
    
                                    
                                    var difference = Math.floor((t2-t1)/(24*3600*1000));
                                    
                                    document.getElementById('total').value = difference+1;
                                    
                                });
                                
                                
                            </script>

                            <div class="form-group row">
                                <label class="col-sm-2" >
                                    กลับมาทำงานวันที่
                                </label>
                                <div class="col-sm-3">
                                    <input type="date"   name="leave_day_come" id="leave_day_come" required  class="form-control" >
                                </div>
                            </div>
                            <hr>
                            <div class="form-group row">
                                <label class="col-sm-2">
                                </label>
                                <div class="col-sm-3">
                                    <button type="submit" class="btn btn-success" name="save" style="width: 100%">บันทึก</button>
                                </div>
                            </div>
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
                            <p id='idtext'></p>
                            <form action="all_leave_delete.php" method="post">
                                <input type="hidden" name="id" id="id2" value="">
                                <button type="submit" name="delete" class="btn btn-danger">ตกลง</button>
                            </form>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <script src="../js/admin_leave.js"></script>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="../js/scripts.js"></script>
    </body>
</html>
