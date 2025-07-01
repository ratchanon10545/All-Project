<?php
include '../config.php';
header("Access-Control-Allow-Origin:".$originURL);
header("Content-Type: application/json; charset=UTF-8");
include '../db.php';
require_once 'PHPExcel/Classes/PHPExcel.php';
error_reporting(E_ALL);

date_default_timezone_set('Asia/Bangkok');

$date = convertDateThaiToEng($_GET['date']);


$date1 = $date.' 00:00:00';
$date2 = $date.' 23:59:59';

if (!isset($_SERVER["HTTP_X_API_KEY"])) {
    echo json_encode('no tokne');
    die();
}
// echo json_encode([$date1 , $date2]);
try{
    $query = "select * from users where token = ?";
    $stmt = $dbh->prepare($query);
    if($stmt->execute([
        $_SERVER["HTTP_X_API_KEY"]
    ])){
        $num = $stmt->rowCount();
        if($num == 1) {
            $object = new stdClass();
            $object->RespCode = 200;
            $object->RespMessage = 'success';
        }
        else {
            echo json_encode('wrong tokne 2');
            die();
        }
    }
    else {
        echo json_encode('wrong tokne 1');
            die();
    }
        // Create new PHPExcel object
    echo date('H:i:s') . " Create new PHPExcel object\n";
    $objPHPExcel = new PHPExcel();

    // Set properties
    echo date('H:i:s') . " Set properties\n";
    $objPHPExcel->getProperties()->setCreator("Pathumthani")
        ->setLastModifiedBy("Pathumthani")
        ->setTitle("Office 2007 XLSX Test Document")
        ->setSubject("Office 2007 XLSX Test Document")
        ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
        ->setKeywords("office 2007 openxml php")
        ->setCategory("Test result file");

    // Set Fonts
    $styleArray = array(
        'font'  => array(
            'size'  => 16,
            'name'  => 'TH SarabunPSK'
        )
    );
    // $datestingtotime = new DateTime($date);
    // $datenumber = date_format($datestingtotime, 'd');
    // $monthfull = date("m",strtotime($date));
    // $month_thai = monththai($monthfull);
    $time_input = strtotime($date); 
    $date_input = getDate($time_input);
    $month_thai = monththai($date_input['mon']);
    $year_re_up =  date("Y",strtotime($date)) + 543;
    // Add Data
    echo date('H:i:s') . " Add some data\n";
    $objPHPExcel->setActiveSheetIndex(0)
        ->setCellValue('A1', 'แบบรายงานการสำรวจความพึงพอใจของผู้รับบริการ')
        ->setCellValue('A2', 'สำนักงานที่ดินจังหวัดพิจิตร')
        ->setCellValue('A3', 'ประจำวันที่ '.$date_input['mday'].' '. $month_thai . ' พ.ศ. ' . $year_re_up)
        ->setCellValue('A4', 'ลำดับ')
        ->setCellValue('B4', 'ช่องบริการ')
        ->setCellValue('C4', 'ระดับความพึงพอใจ')
        ->setCellValue('H4', "จำนวนผู้\nประเมิน")
        ->setCellValue('I4', "คะแนน\nเฉลี่ย")
        // ->setCellValue('J4', "จำนวน\nงานทั้งหมด")
        // ->setCellValue('K4', "ผู้ประเมิน\nร้อยละ 80")
        ->setCellValue('J4', "ผลการ\nประเมิน")
        ->setCellValue('C5', '5')
        ->setCellValue('D5', '4')
        ->setCellValue('E5', '3')
        ->setCellValue('F5', '2')
        ->setCellValue('G5', '1')
        ->setCellValue('A21', 'เฉลี่ยรวม')
        ->setCellValue('B23', '***หมายเหตุ***')
        ->setCellValue('B24', 'เกณฑ์ระดับความพึงพอใจ')
        ->setCellValue('B25', 'ตั้งแต่ ')
        ->setCellValue('C25', '1.00 - 1.50  หมายถึงระดับความพึงพอใจน้อยที่สุด')
        ->setCellValue('C26', '1.51 - 2.50  หมายถึงระดับความพึงพอใจน้อย')
        ->setCellValue('C27', '2.51 - 3.50  หมายถึงระดับความพึงพอใจพอใช้')
        ->setCellValue('C28', '3.51 - 4.50  หมายถึงระดับความพึงพอใจมาก')
        ->setCellValue('C29', '4.51 - 5.00   หมายถึงระดับความพึงพอใจมากที่สุด');
        // ->setCellValue('A31', 'เรียนเจ้าพนักงานที่ดิน')
        // ->setCellValue('B32', 'ขอนำส่งแบบรายงานการสำรวจความพึงพอใจของผู้รับบริการ')
        // ->setCellValue('B33', 'ประจำวันที่ '.$date_input['mday'].' '. $month_thai . ' พ.ศ. ' . $year_re_up)
        // ->setCellValue('B34', 'เจ้าหน้าที่ผู้ไม่ผ่านเกณฑ์ประเมินร้อยละ 80 ได้แก่เจ้าหน้าที่ลำดับที่')
        // ->setCellValue('B35', 'เรียนมาเพื่อโปรดทราบ');

    

    $j = 6;
         
    $sql2 = "SELECT officer.id , officer.name, COUNT(case when datadate.point = 5 then 1 end) as point5 , COUNT(case when datadate.point = 4 then 1 end) as point4, COUNT(case when datadate.point = 3 then 1 end) as point3, COUNT(case when datadate.point = 2 then 1 end) as point2, COUNT(case when datadate.point = 1 then 1 end) as point1, COUNT(datadate.point) as allpoint, ROUND(AVG(datadate.point) , 2) as avgpoint 
    FROM officer 
    LEFT JOIN ( SELECT *
    			FROM data
               WHERE data.date BETWEEN ? and ?)  as datadate
    ON datadate.officer_id = officer.id
    GROUP BY officer.id ORDER BY officer.id";
    $sql2 = $dbh->prepare($sql2);
    $sql2->bindParam(1,$date1);
    $sql2->bindParam(2,$date2);
    $sql2->execute();
    
    $objResult2 = $sql2->fetchAll(PDO::FETCH_ASSOC);
    foreach($objResult2 as $obj){
        $objPHPExcel->getActiveSheet()->setCellValue('A' . $j, $obj["id"]);
        $objPHPExcel->getActiveSheet()->setCellValue('B' . $j, $obj["name"]);
        $objPHPExcel->getActiveSheet()->setCellValue('C' . $j, $obj["point5"]);
        $objPHPExcel->getActiveSheet()->setCellValue('D' . $j, $obj["point4"]);
        $objPHPExcel->getActiveSheet()->setCellValue('E' . $j, $obj["point3"]);
        $objPHPExcel->getActiveSheet()->setCellValue('F' . $j, $obj["point2"]);
        $objPHPExcel->getActiveSheet()->setCellValue('G' . $j, $obj["point1"]);
        $objPHPExcel->getActiveSheet()->setCellValue('H' . $j, $obj["allpoint"]);
        $objPHPExcel->getActiveSheet()->setCellValue('I' . $j, $obj["avgpoint"]);
        $objPHPExcel->getActiveSheet()->setCellValue('J' . $j, rankpoint($obj["avgpoint"]));
        $j++;
    }
	
    // กำหนดการขึ้นบรรทัดใหม้ภายใน cell
    $objPHPExcel->getActiveSheet()->getStyle('H4')->getAlignment()->setWrapText(true);
    $objPHPExcel->getActiveSheet()->getStyle('I4')->getAlignment()->setWrapText(true);
    $objPHPExcel->getActiveSheet()->getStyle('J4')->getAlignment()->setWrapText(true);
    // $objPHPExcel->getActiveSheet()->getStyle('K4')->getAlignment()->setWrapText(true);
    // $objPHPExcel->getActiveSheet()->getStyle('L4')->getAlignment()->setWrapText(true);
    // กำหนดเส้นตาราง
    $objPHPExcel->getActiveSheet()
        ->getStyle("A4:J21")
        ->applyFromArray(
            array(
                'borders' => array(
                    'allborders' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN,
                        'color' => array('rgb' => '000000')

                    )
                )
            )
        );
    //Merge Cell
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('A1:J1');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('A2:J2');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('A3:J3');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('A4:A5');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('B4:B5');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('C4:G4');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('H4:H5');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('I4:I5');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('J4:J5');
    // $objPHPExcel->setActiveSheetIndex(0)->mergeCells('K4:K5');
    // $objPHPExcel->setActiveSheetIndex(0)->mergeCells('L4:L5');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('A21:B21');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('C25:J25');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('C26:J26');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('C27:J27');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('C28:J28');
    $objPHPExcel->setActiveSheetIndex(0)->mergeCells('C29:J29');
    
    $objPHPExcel->getActiveSheet()->getStyle("A1:J35")->applyFromArray($styleArray);

    //----------------------------------OTHER OPTION----------------------------------//

    //Set Header font bold
    $objPHPExcel->getActiveSheet()->getStyle('A1:L5')->getFont()->setBold(true);
    $objPHPExcel->getActiveSheet()->getStyle('B23')->getFont()->setBold(true);
    $objPHPExcel->getActiveSheet()->getStyle('I6:K21')->getFont()->setBold(true);

    //Set Header align center
    $objPHPExcel->getActiveSheet()->getStyle('A1:L5')->getAlignment()->applyFromArray(
        array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,)
    );
    $objPHPExcel->getActiveSheet()->getStyle('A6:A21')->getAlignment()->applyFromArray(
        array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,)
    );
    $objPHPExcel->getActiveSheet()->getStyle('C6:J21')->getAlignment()->applyFromArray(
        array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,)
    );
    $objPHPExcel->getActiveSheet()->getStyle('B25')->getAlignment()->applyFromArray(
        array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT,)
    );

    $objPHPExcel->getActiveSheet()->getStyle('A1:L21')->getAlignment()->applyFromArray(
        array('vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,)
    );

    // Set Row Height
    $objPHPExcel->getActiveSheet()->getRowDimension('1')->setRowHeight(24);
    $objPHPExcel->getActiveSheet()->getRowDimension('2')->setRowHeight(24);
    $objPHPExcel->getActiveSheet()->getRowDimension('3')->setRowHeight(24);
    $objPHPExcel->getActiveSheet()->getRowDimension('4')->setRowHeight(22);
    $objPHPExcel->getActiveSheet()->getRowDimension('5')->setRowHeight(22);

    // Set Column Width
    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(5);
    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(27);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(7);
    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(6);
    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(5);
    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(5);
    $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(5);
    $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(9);
    $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(9);
    $objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(12);
    // $objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(10);
    // $objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(9);

    //----------------------------------OTHER OPTION----------------------------------//

    // page margins 
    $objPHPExcel->getActiveSheet()->getPageMargins()->setBottom(0.79);
    $objPHPExcel->getActiveSheet()->getPageMargins()->setLeft(0.20);
    $objPHPExcel->getActiveSheet()->getPageMargins()->setRight(0.20);
    $objPHPExcel->getActiveSheet()->getPageMargins()->setTop(0.79);

    // Rename sheet
    echo date('H:i:s') . " Rename sheet\n";
    $objPHPExcel->getActiveSheet()->setTitle('รายงานประจำวัน');

    // Set page orientation and size
    //echo date('H:i:s') , " Set page orientation and size" , EOL;
    $objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);

    //Print fit column 
    $objPHPExcel->getActiveSheet()->getPageSetup()->setFitToPage(true);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setFitToWidth(1);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setFitToHeight(0);

    // Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $objPHPExcel->setActiveSheetIndex(0);


    // Save Excel 2007 file
    echo date('H:i:s') . " Write to Excel2007 format\n";
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
    $strFileName = "Report.xlsx";
    $objWriter->save($strFileName);
    

    // Echo memory peak usage
    echo date('H:i:s') . " Peak memory usage: " . (memory_get_peak_usage(true) / 8192 / 8192) . " MB\r\n";

    // Echo done
    echo date('H:i:s') . " Done writing file.\r\n";

    header("location:Report.xlsx");
    ob_flush();
   
}
catch(PDOException $e){
    print 'Error!: '.$e->getMessage().'<br/>';
    die();
}
// // and now we're done; close it

$dbh = null;

function convertDateThaiToEng($dateTH)
{
        $splitDate = explode("-", $dateTH);
        $yy = $splitDate[2] - 543;
        $dateEngFormat = "$yy-$splitDate[1]-$splitDate[0]";
        $addEng = date("Y-m-d", strtotime($dateEngFormat));
    
    return $addEng;
}

function rankpoint($avgpoint){
    if($avgpoint == null){
        return null;
    }
    if($avgpoint <= 1.50 &&  $avgpoint >= 1.00  ){
        return "น้อยที่สุด";
    }
    elseif($avgpoint <= 2.50 && $avgpoint >= 1.51){
        return "น้อย";
    }
    elseif($avgpoint <= 3.50 && $avgpoint >= 2.51){
        return "พอใช้";
    }
    elseif($avgpoint <= 4.50 && $avgpoint >= 3.51){
        return "มาก";
    }
    else{
        return "มากที่สุด";
    }
}
function monththai($monthnumber){
    $month = array(
        "", 
        "มกราคม", 
        "กุมภาพันธ์", 
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
    );
    return $month[$monthnumber];
}
?>