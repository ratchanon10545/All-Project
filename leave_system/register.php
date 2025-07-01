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
</head>
<body >
    <div class="container" >
        <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-10 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5" >
                <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-900 mb-4" >Register</h1>
                    </div>

                    <form action="register_db.php" method="post">
                        <?php if(isset($_SESSION["error"])):?>
                            <div class="alert alert-danger" role="alert">
                                 <?php
                                        echo $_SESSION['error'];
                                        unset($_SESSION['error']);
                                ?>
                            </div>
                        <?php endif ?>
                        <?php if(isset($_SESSION["warning"])):?>
                            <div class="alert alert-warning" role="alert">
                                 <?php
                                        echo $_SESSION['warning'];
                                        unset($_SESSION['warning']);
                                ?>
                            </div>
                        <?php endif ?>
                        <?php if(isset($_SESSION["sucess"])):?>
                            <div class="alert alert-sucess" role="alert">
                                 <?php
                                        echo $_SESSION['sucess'];
                                        unset($_SESSION['sucess']);
                                ?>
                            </div>
                        <?php endif ?>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" aria-describedby="username" name="username">
                            
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password">
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" name="signup" class="btn btn-primary">sigup</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>

    
</body>
</html>