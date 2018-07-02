<?php
    include("conn.php");
    $what_move =  json_decode($_POST['what_move'],true);

    if($what_move == "get_setting"){
        $html_page =  json_decode($_POST['html_page'],true);
    
        $sql = "SELECT * FROM `setting_data` WHERE `setting_page` = '$html_page'";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
    if($what_move == "in_setting_backgournd"){
        $image_name =  json_decode($_POST['image_name'],true);//获取用户给予的图片命名
        $type = $_FILES['file']['type'];//获取图片类型
        $tmp = $_FILES['file']['tmp_name'];//获取图片临时存储位置

        $p=null;
        if($type=="image/png"){
            $p.=".png";
        }elseif($type=="image/jpeg"){
            $p.=".jpeg";
        }else{        
            echo json_encode("bad!",JSON_UNESCAPED_UNICODE);
            exit;
        }
        $save_path = "../img/background/".$image_name.$p;

        if(move_uploaded_file($tmp,$save_path)){        
            $sql = "INSERT INTO `setting_data` VALUES (null,'setting','background_image','$image_name$p')";
            mysqli_query($conn,$sql);
            echo json_encode("ok!",JSON_UNESCAPED_UNICODE);
        }else{        
            echo json_encode("bad!",JSON_UNESCAPED_UNICODE);
        }
    }
    if($what_move == "update_backgournd"){        
        $pic_name =  json_decode($_POST['pic_name'],true);//获取用户给予的图片命名
        $sql = "UPDATE `setting_data` SET `setting_detail`='$pic_name' WHERE`setting_page`='frame' AND `setting_name`='body_background'";
        mysqli_query($conn,$sql);
        echo json_encode("ok!",JSON_UNESCAPED_UNICODE);   
    }
    if($what_move == "delete_backgournd"){        
        $pic_name =  json_decode($_POST['pic_name'],true);//获取用户给予的图片命名
        $sql = "DELETE FROM `setting_data` WHERE `setting_page` = 'setting' AND `setting_name` = 'background_image' AND `setting_detail` = '$pic_name'";
        mysqli_query($conn,$sql);
        if(unlink("../img/background/".$pic_name)){        
            echo json_encode("ok!",JSON_UNESCAPED_UNICODE);
        }else{        
            echo json_encode("bad!",JSON_UNESCAPED_UNICODE);
        }
    }
    if($what_move == "update_use"){
        $update_what =  json_decode($_POST['update_what'],true);
        $update_text =  json_decode($_POST['update_text'],true);
        if($update_what=="用户名"){
            $update_what = "username";
        }else if($update_what=="密码"){            
            $update_what = "password";
        }
        $sql = "UPDATE `user_data` SET $update_what='$update_text' WHERE `id`=1";
        mysqli_query($conn,$sql);
        echo json_encode("ok!",JSON_UNESCAPED_UNICODE);
    }
    if($what_move == "sqlfile"){
        $sql = file_get_contents($_FILES['file']['tmp_name']);
        $arr = explode(';',$sql);
        foreach($arr as $va){
            mysqli_query($conn,$va.';');
        }
        echo json_encode("over!",JSON_UNESCAPED_UNICODE);        
    }
    if($what_move == "get_table"){
        $sql = "SHOW TABLES";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }
    if($what_move == "drop_table"){
        $drop_what =  json_decode($_POST['drop_what'],true);
        $sql = "DROP TABLE $drop_what";
        mysqli_query($conn,$sql);
        echo json_encode("ok!",JSON_UNESCAPED_UNICODE);
    }
?>