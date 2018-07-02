<?php
    // outside_all.php
    include("conn.php");
    header("Content-Type:application/json");
    $what_move =  json_decode($_POST['what_move'],true);
    
    if($what_move == "select"){
        $select =  json_decode($_POST['arr'],true);
        $page =  json_decode($_POST['page'],true);
        $page_end = 20;
        $page_start = $page*20-20;

        //输出全部
        if($select[0]=="All"){
            $sql = "SELECT COUNT(*) as 'count' FROM `patient_data`";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            $sql = "SELECT * FROM `patient_data` ORDER BY `today` DESC LIMIT $page_start ,$page_end";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
        }
        //搜索名字
        if($select[0]=="Name"){
            $sql = "SELECT COUNT(*) as 'count' FROM `patient_data` WHERE `name` LIKE '%$select[1]%'";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            $sql = "SELECT * FROM `patient_data` WHERE `name` LIKE '%$select[1]%' ORDER BY `today` DESC LIMIT $page_start ,$page_end";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
        }
        //搜索住院号/门诊号
        if($select[0]=="Num"){
            $sql = "SELECT COUNT(*) as 'count' FROM `patient_data` WHERE `num` LIKE '%$select[1]%'";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            $sql = "SELECT * FROM `patient_data` WHERE `num` LIKE '%$select[1]%' ORDER BY `today` DESC LIMIT $page_start ,$page_end";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
        }
        //搜索初步诊断
        if($select[0]=="Fsirt"){
            $sql = "SELECT distinct `patient_id` FROM `sick_data` WHERE `invalue` LIKE '%$select[1]%' AND `kind_one` = 5";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr_id[] = $row;
            }
            $sql = "SELECT COUNT(distinct `patient_id`) as 'count' FROM `sick_data` WHERE `invalue` LIKE '%$select[1]%' AND `kind_one` = 5";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            for($i=0;$i<count($arr_id);$i++){
                $get = $arr_id[$i]["patient_id"];
                $sql = "SELECT * FROM `patient_data` WHERE `id` = $get ORDER BY `today` DESC LIMIT $page_start ,$page_end";
                $result = mysqli_query($conn,$sql);
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
            }
        }
        //搜索最后诊断
        if($select[0]=="Last"){
            $sql = "SELECT distinct `patient_id` FROM `sick_data` WHERE `invalue` LIKE '%$select[1]%' AND `kind_one` = 7";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr_id[] = $row;
            }
            $sql = "SELECT COUNT(distinct `patient_id`) as 'count' FROM `sick_data` WHERE `invalue` LIKE '%$select[1]%' AND `kind_one` = 7";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            for($i=0;$i<count($arr_id);$i++){
                $get = $arr_id[$i]["patient_id"];
                $sql = "SELECT * FROM `patient_data` WHERE `id` = $get ORDER BY `today` DESC LIMIT $page_start ,$page_end";
                $result = mysqli_query($conn,$sql);
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
            }
        }
        //搜索内容
        if($select[0]=="Detail"){
            $sql = "SELECT distinct `patient_id` FROM `sick_data` WHERE `invalue` LIKE '%$select[1]%'";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr_id[] = $row;
            }
        // echo json_encode($arr_id,JSON_UNESCAPED_UNICODE);
            $sql = "SELECT COUNT(distinct `patient_id`) as 'count' FROM `sick_data` WHERE `invalue` LIKE '%$select[1]%'";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){
                $arr[] = $row;
            }
            for($i=0;$i<count($arr_id);$i++){
                $get = $arr_id[$i]["patient_id"];       
        // echo json_encode($get,JSON_UNESCAPED_UNICODE);                
                $sql = "SELECT * FROM `patient_data` WHERE `id` = $get ORDER BY `today` DESC LIMIT $page_start ,$page_end";
                $result = mysqli_query($conn,$sql);
                while($row = mysqli_fetch_assoc($result)){
                    $arr[] = $row;
                }
            }
        // echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        }
        for($i=1;$i<count($arr);$i++){
            $id = $arr[$i]['id'];
            $sql = "SELECT * FROM `sick_data` WHERE `patient_id` = $id AND (`kind_one` = 5 OR `kind_one` = 7)";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_assoc($result)){       
                $judgment[]=$row;
            }
        }

        if(!empty($judgment)){
            $arr[] = $judgment;
        }else{
            $arr[] = "null";
        }
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
?>