<?php 
  session_start();
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
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .fc-event-end   .fc-event-time{
      display: none;
    }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- JS for jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.8/dist/sweetalert2.all.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.8/dist/sweetalert2.min.css">
    <script>

      document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          height:700,
          events:"event.php",

          eventClick: function(info){
            info.jsEvent.preventDefault();
            var date = new Date(info.event.end);
            date.setDate(date.getDate() - 1);
            //var dateFormat = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
            Swal.fire({
              icon:'info',
              title:info.event.title,
              html:'<p>แผนก: '+info.event.extendedProps.position+'</p>' +
                    '<p>ประเภท: '+info.event.extendedProps.type+'</p>' +
                    '<p>เริ่ม: '+info.event.extendedProps.start_date+'</p> <p>สิ้นสุด: '+info.event.extendedProps.end_date+'</p>'+
                    '<p>กลับมาทำงาน: '+info.event.extendedProps.come+'</p>'
            });

          }
        });
        
        calendar.render();
      });
      
    </script>
    <!-- bootstrap css and js -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    
    
</head>
<body>
    <div class="container-fluide ">
        <a href="home.php"><i class="fa-solid fa-angle-left" style="color: #050505; font-size:20px; padding-top:5px; padding-left:10px;"></i></a>
      </div>
    <div class="container">
      <div id="calendar"></div>
    </div>
    


</body>
</html>