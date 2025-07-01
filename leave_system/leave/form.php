<?php 
    session_start();
    require("../connection.php");
    if(!isset($_SESSION['user_login'])){
        header("location : ../index.php");
    }
    if(empty($_GET['d'])){
        $_SESSION['error'] = "กรุณาเข้าสู่ระบบ";
        header("location: ../index.php");
    }
    else{
        $empid = base64_decode($_GET['d']);
    }
?>
<!doctype html>
<html lang="en">
    <head>
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
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.9/dist/sweetalert2.all.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.9/dist/sweetalert2.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <title>BKL-Leave</title>
    </head>
    <body>
        <div class="container" style="margin-top: 50px;">
            <div class="row">
                <div class="container-fluide ">
                        <a href="../user/home.php"><i class="fa-solid fa-angle-left" style="color: #050505; font-size:20px; padding-top:5px; padding-left:10px;"></i></a>
                </div>
                <div class="col-sm-12">
                    <h1 class="text-center"> ฟอร์มบันทึกการลา </h1>
                    <hr>
                    <?php if(isset($_SESSION["error"])):?>
                        <script>
                                Swal.fire({
                                        title: 'เกิดข้อผิดพลาด!',
                                        icon: 'error',
                                        confirmButtonText:"OK",
                                        html: '<p><?php echo $_SESSION['error']; ?></p>' 
                                        })
                                
                        </script>
                        <div class="alert alert-danger" role="alert">
            
                        <?php
                           echo $_SESSION['error'];
                            unset($_SESSION['error']);
                         ?>
                         </div>
                         <?php endif ?>
                         <?php if(isset($_SESSION["success"])):?>
                            <script>
                                Swal.fire({
                                        title: 'บันทึก!',
                                        icon: 'success',
                                        showConfirmButton: false,
                                        html:"<a href='../user/home.php' class='btn btn-success ' >OK</a>"
                                        })
                                
                            </script>
                            <?php unset($_SESSION['success']); ?>
                        <?php endif ?>
                </div>
                <div class="col-sm-12 bg-primary" style="border-radius: 10px;">
                    <br>
                    <form action="form_db.php" method="post">
                    
                        <input type="hidden" name="empid" value="<?php echo $empid ?>">
                        <div class="form-group row">
                            <label class="col-2 col-sm-2" style="color: white;">
                                ประเภท
                            </label>
                            <div class="col-10 col-sm-4">
                                <select name="leave_type" class="form-control" required>
                                    <option value="">-เลือกประเภทการลา-</option>
                                    <option value="1">-ลาป่วย</option>
                                    <option value="2">-ลากิจ</option>
                                    <option value="3">-ลาพักร้อน</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-sm-2" style="color: white;">
                                เรียน
                            </label>
                            <div class="col-10 col-sm-4">
                                <!--<select name="leave_boss" class="form-control" readonly>
                                    <option value="">-เลือกหัวหน้าแผนก-</option>
                                    <option value="1">-Mr.Warut</option>
                                    <option value="2">-Mr.Siripong</option>
                                    <option value="3">-Mr.Wachira</option>
                                    <option value="4">-Mr.Anusit</option>
                                </select> -->
                                <input type="hidden" name="leave_boss" class="form-control" id="boss_id">
                                <input class="form-control" readonly id="boss">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-sm-2" style="color: white;">
                                ข้าพเจ้า
                            </label>
                            <div class="col-10 col-sm-4">
                                <input type="text" name="emp_name" class="form-control"></input>
                            </div>
                            
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-sm-1" style="color: white;">
                                แผนก
                            </label>
                            <div class="col-10 col-sm-4">
                                <select name="emp_position" class="form-control" id="position" required>
                                    <option value="">-เลือกแผนก-</option>
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

                        <div class="form-group row">
                            <label class="col-2 col-sm-2" style="color: white;">
                                เนื่องด้วย
                            </label>
                            <div class="col-10 col-sm-5">
                                <textarea name="leave_reason" class="form-control" required placeholder="ระบุสาเหตุการลา"></textarea>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label class="col-sm-2" style="color: white;">
                                ตั้งแต่
                            </label>
                            <div class="col-sm-3">
                                <input type="date" id="t1"  name="leave_day_begin"  required  class="form-control">
                                
                            </div>
                            <label class="col-sm-1" style="color: white;">
                                ถึง
                            </label>
                            <div class="col-sm-3">
                                <input type="date" id="t2"  name="leave_day_end"  required  class="form-control">
                            </div>
                            
                        </div>
                        <div class="form-group row">
                            
                            <label class="col-2 col-sm-2" style="color: white;">
                                กำหนด
                            </label>
                            <div class="col-3 col-sm-2">
                                <input type="number" name="leave_day_total" id="total" readonly class="form-control">
                            </div>
                            <label class="col-1 col-sm-1" style="color: white;">
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
                            <label class="col-sm-2" style="color: white;">
                                กลับมาทำงานวันที่
                            </label>
                            <div class="col-sm-3">
                                <input type="date"   name="leave_day_come"  required  class="form-control">
                            </div>
                        </div>
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
        </div>
    </body>
</html>