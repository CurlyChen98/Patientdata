<?php
    include("conn.php");
    header("Content-Type:application/json");

    $sql = "SELECT distinct `kind_one` FROM `luru_data` ORDER BY `kind_one` ASC";
	$result = mysqli_query($conn,$sql);
    $kind_1_sum=mysqli_num_rows($result);
    $arr = [];

    for($i=1;$i<=$kind_1_sum;$i++){
        $sql = "SELECT distinct `kind_two` FROM `luru_data` WHERE `kind_one` = $i ORDER BY `kind_two` ASC";
        $result = mysqli_query($conn,$sql);
        $kind_2_sum=mysqli_num_rows($result);
        for($k=1;$k<=$kind_2_sum;$k++){
            $sql = "SELECT distinct `kind_thr` FROM `luru_data` WHERE `kind_one` = $i AND `kind_two` = $k";
            $result = mysqli_query($conn,$sql);
            $kind_3_sum=mysqli_num_rows($result);
            $arr[$i][$k] = $kind_3_sum;
        }
    }
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>