<?php 

    require("../connection.php");

    $approval = 1;

    $result = $conn->prepare("SELECT empid,name,position,leave_day_begin,leave_day_end,leave_day_come	,type FROM leave2 WHERE approval = :approval");
    $result->bindParam(":approval",$approval);
    $result->execute();
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    
    $eventArray = array();
    if(count($rows) > 0 ){
        foreach ($rows as $row){
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
            if($row['type'] == 1){
                $type_value = "ลาป่วย";
            }
            else if($row['type'] == 2){
                $type_value = "ลากิจ";
            }
            else{
                $type_value = "ลาพักร้อน";
            }
            $date = new DateTime($row['leave_day_end']);
            $date->modify("+1 day");
            $end = $date->format('Y-m-d');
            $dateday_come = date(DATE_RFC1123, strtotime($row['leave_day_come']));
            $dateday_start = date(DATE_RFC1123, strtotime($row['leave_day_begin']));
            $dateday_end = date(DATE_RFC1123, strtotime($row['leave_day_end']));
            $eventArray[]=[
                'id' => $row['empid'],
                'title'=> $row['name'],
                'position'=>$row['position'],
                'start' => $row['leave_day_begin'],
                'end' => $end,
                'type' => $type_value,
                'come' => $dateday_come,
                'start_date'=>$dateday_start,
                'end_date'=>$dateday_end,
                'color'=>$color
            ];
        }
    }
    
    //var_dump($eventArray);
    echo json_encode($eventArray);
   