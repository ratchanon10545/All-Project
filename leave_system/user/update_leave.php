<?php
    session_start();
    if(!isset($_SESSION['user_login'])){
        
        header('location: ../index.php');
    }
    
    require("../connection.php");

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
                        $id = $_POST['id'];
                        $stmt = $conn -> prepare("SELECT type,boss,name,position,leave_reason,leave_day_total,leave_day_begin,leave_day_end,leave_day_come,approval
                                                    FROM leave2 WHERE id = :id;");
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
                <div class="container-fluide ">
                    <a href="show_leave.php?d=<?php echo base64_encode($id) ?>"><i class="fa-solid fa-angle-left" style="color: #050505; font-size:20px; padding-top:5px; padding-left:10px;"></i></a>
                </div>
                <div class="container-fluid pt-5">
                    
                    <form action="update_leave_db2.php" method="post">
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
                                <select name="leave_type" class="form-control" required>
                                    <option value="<?php echo $rows['type']  ?>"><?php echo $type_value ?></option>
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
                                <!--<select name="leave_boss" class="form-control" required>
                                    <option value="<?php echo $rows['boss']  ?>"><?php echo $boss_value ?></option>
                                    <option value="1">-Mr.Warut</option>
                                    <option value="2">-Mr.Siripong</option>
                                    <option value="3">-Mr.Wachira</option>
                                    <option value="4">-Mr.Anusit</option>
                                </select> -->
                                <input type="hidden" name="leave_boss" id="boss_id" value="<?php echo $rows['boss']  ?>">
                                <input class="form-control" readonly id="boss" value="<?php echo $boss_value ?>"> 
                            </div>
                        </div>
                        <div class="form-group row p-2">
                            <label class="col-2 col-sm-2" >
                                ข้าพเจ้า
                            </label>
                            <div class="col-10 col-sm-4">
                                <input type="text" name="emp_name" class="form-control" value="<?php echo $rows ['name'] ?>"></input>
                            </div>
                            
                        </div>
                        <div class="form-group row p-2">
                            <label class="col-2 col-sm-1" >
                                แผนก
                            </label>
                            <div class="col-10 col-sm-4">
                                <select name="emp_position" id="position" class="form-control" required>
                                    <option value="<?php echo $rows['position']  ?>"><?php echo $rows['position'] ?></option>
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
                        <script>
                            document.getElementById("position").addEventListener("change", function () {
                                var pos = document.getElementById("position").value;
                                if(pos == "วังน้อย"){ 
                                    document.getElementById('boss').value = "Mr.Warut";
                                    document.getElementById('boss_id').value = "1";
                                }
                                else if(pos == "LOG Innovation"){
                                    document.getElementById('boss').value = "Mr.Wachira";
                                    document.getElementById('boss_id').value = "3";
                                }
                                else if(pos == "Business Development"){
                                    document.getElementById('boss').value = "Mr.Anusit";
                                    document.getElementById('boss_id').value = "4";
                                }
                                else{
                                    document.getElementById('boss').value = "Mr.Siripong";
                                    document.getElementById('boss_id').value = "2";
                                }
                            });


                            
                        </script>
                        <div class="form-group row p-2">
                            <label class="col-2 col-sm-2" >
                                เนื่องด้วย
                            </label>
                            <div class="col-10 col-sm-5">
                                <textarea name="leave_reason" class="form-control" required ><?php echo $rows['leave_reason'] ?></textarea>
                            </div>
                        </div>
                        
                        <div class="form-group row p-2">
                            <label class="col-sm-2" >
                                ตั้งแต่
                            </label>
                            <div class="col-sm-3">
                                <input type="date" id="t1"  name="leave_day_begin"  required  class="form-control" value="<?php echo $rows['leave_day_begin'] ?>">
                            </div>
                            <label class="col-sm-1" >
                                ถึง
                            </label>
                            <div class="col-sm-3">
                                <input type="date" id="t2"  name="leave_day_end"  required  class="form-control" value="<?php echo $rows['leave_day_end'] ?>">
                            </div>
                            
                        </div>
                        <div class="form-group row p-2">
                            
                            <label class="col-2 col-sm-2" >
                                กำหนด
                            </label>
                            <div class="col-3 col-sm-2">
                                <input type="number" name="leave_day_total" id="total" readonly class="form-control" value="<?php echo $rows['leave_day_total'] ?>">
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
                                <input type="date"   name="leave_day_come"  required  class="form-control" value="<?php echo $rows['leave_day_come'] ?>">
                            </div>
                        </div>
                        <hr>
                        <?php if(isset($_POST['change'])) :?>
                        <input type="hidden" name='id' value="<?php echo $id?>">
                        
                        <div class="form-group row">
                            <label class="col-sm-2">
                            </label>
                            <div class="col-sm-3">
                                <button type="submit" class="btn btn-success" name="save" style="width: 100%">บันทึก</button>
                            </div>
                        </div>
                    
                    
                    
                        <?php endif ?>
                    </form>
                </div>
            </div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
        <!-- Core theme JS-->
        <script src="../js/scripts.js"></script>
    </body>
</html>
