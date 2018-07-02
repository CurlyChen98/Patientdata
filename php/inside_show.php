<?php
    include("conn.php");

    $sql = "SELECT * FROM `luru_data` ORDER BY `luru_data`.`kind_one` ASC, `luru_data`.`kind_two` ASC, `luru_data`.`kind_thr` ASC";
    $result = mysqli_query($conn,$sql);
    while($row = mysqli_fetch_assoc($result)){
        $arr[] = $row;
    }
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>