<?php
    include("conn.php");
    header("Content-Type:application/json");

    $what_move = json_decode($_POST['what_move'],true);

    if($what_move == "inside"){
        $push_inside =  json_decode($_POST['push_inside'],true);
        $patient_name =  json_decode($_POST['patient_name'],true);
        
        echo json_encode($what_move ,JSON_UNESCAPED_UNICODE);

        $name = $patient_name['name'];
        $bronday = $patient_name['bron'];
        $age = $patient_name['age'];
        $number = $patient_name['number'];
        $num = $patient_name['num'];
        $today = $patient_name['today'];
        $sex = $patient_name['sex'];

        $sql = "INSERT INTO `patient_data` VALUES (null,'$name',$age,'$number','$num','$today','$sex','$bronday')";
        mysqli_query($conn,$sql);
        $id = mysqli_insert_id($conn);

        for($i=0;$i<count($push_inside);$i++){
            $note0 = $push_inside[$i][0];
            $note1 = $push_inside[$i][1];
            $note2 = $push_inside[$i][2];
            $note3 = $push_inside[$i][3];
            $note4 = $push_inside[$i][4];
            $sql="INSERT INTO `sick_data`VALUES ($id,$note0,$note1,$note2,'$note3')";
            mysqli_query($conn,$sql);
        }
    }

    if($what_move == "update"){
        $push_inside =  json_decode($_POST['push_inside'],true);
        $patient_name =  json_decode($_POST['patient_name'],true);
        echo json_encode($what_move,JSON_UNESCAPED_UNICODE);

        $id = $patient_name['id'];
        $name = $patient_name['name'];
        $bronday = $patient_name['bron'];
        $age = $patient_name['age'];
        $number = $patient_name['number'];
        $num = $patient_name['num'];
        $sex = $patient_name['sex'];

        $sql = "UPDATE `patient_data` SET `name`='$name',`age`='$age',`number`='$number',`num`='$num',`sex`='$sex',`bronday`='$bronday' WHERE `id`=$id";
        mysqli_query($conn,$sql);

        $sql = "DELETE FROM `sick_data` WHERE `patient_id`=$id";
        mysqli_query($conn,$sql);

        for($i=0;$i<count($push_inside);$i++){
            $note0 = $push_inside[$i][0];
            $note1 = $push_inside[$i][1];
            $note2 = $push_inside[$i][2];
            $note3 = $push_inside[$i][3];
            $note4 = $push_inside[$i][4];
            $sql="INSERT INTO `sick_data`VALUES ($id,$note0,$note1,$note2,'$note3')";
            mysqli_query($conn,$sql);
        }
    }

    if($what_move == "delete"){
        $id =  json_decode($_POST['id'],true);
        echo json_encode($what_move,JSON_UNESCAPED_UNICODE);

        $sql = "DELETE FROM `patient_data` WHERE `id`=$id";
        mysqli_query($conn,$sql);

        $sql = "DELETE FROM `sick_data` WHERE `patient_id`=$id";
        mysqli_query($conn,$sql);
    }

    if($what_move == "print"){
        $id =  json_decode($_POST['id'],true);

        $sql = "SELECT * FROM `patient_data` WHERE `id` = $id";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
        $sql = "SELECT * FROM `sick_data` WHERE `patient_id` = $id AND `kind_one` = 6 ORDER BY `kind_one` ASC, `kind_two` ASC, `kind_thr` ASC";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
        $sql = "SELECT * FROM `luru_data` WHERE `kind_one` = 6 ORDER BY `kind_one` ASC, `kind_two` ASC, `kind_thr` ASC";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $arr_six[] = $row;
        }
        $arr[] = $arr_six;
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
?>