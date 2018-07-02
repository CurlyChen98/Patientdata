<?php
    //outside_one.php
    include("conn.php");
    header("Content-Type:application/json");
    
    if(!empty($_POST['id'])){
        $id =  json_decode($_POST['id'],true);
        $sql = "SELECT * FROM `patient_data` WHERE `id` = $id";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
        $sql = "SELECT * FROM `sick_data` WHERE `patient_id` = $id ORDER BY `kind_one` ASC, `kind_two` ASC, `kind_thr` ASC";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
?>