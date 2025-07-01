<?php
    session_start();
    require("connection.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300&display=swap" rel="stylesheet">
    <style>
        body p{
            font-family: 'Sarabun', sans-serif;
        }
    </style>
</head>
<body style="background-color: #333333;">
    <div class="container" >
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5" style="background-color: #585858;">
                <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-900 mb-4" style="color:white;">Welcome</h1>
                    </div>

                    <form class="user" action="index_db.php" method="post">
                        <?php if(isset($_SESSION["error"])):?>
                            <div class="alert alert-danger" role="alert">
                                <?php
                                    echo $_SESSION['error'];
                                    unset($_SESSION['error']);
                                ?>
                            </div>
                        <?php endif ?>
                        <picture>
                            <img src="" id="img" class="img-fluid img-thumbnail" alt="..." >
                        </picture>
                        <div class="form-group pt-3 ">
                            <input type="hidden" name="userId" id="userId">
                            <input type="hidden" name="imgUrl" id="imgUrl">
                            <input type="text" name="name" class="form-control form-control-user text-center" style="border: none;" readonly id='name' >
                        </div>
                        <div class="form-group pt-3">
                            <input type="text" class="form-control form-control-user"
                                 placeholder="ใส่เลขบัตรประชาชน 13 หลัก" name="IdentificationNumber"
                                 value="<?php if(isset($_COOKIE['IdentificationNumber'])){
                                    echo $_COOKIE['IdentificationNumber'];} ?>">
                        </div>
                        <div class="form-group pt-3 text-center">
                            <button type="submit" name='submit' class="btn btn-primary" >ตกลง</button>
                        </div>
                    </form>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js"></script>
    <script charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
    <script src="js/index.js"></script>
</body>
</html>