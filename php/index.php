<?php
    include("conn.php");
    $userlogin =  json_decode($_POST['userlogin'],true);
    
    $username = $userlogin['username'];
    $password = $userlogin['password'];
    $sql = "SELECT * FROM `user_data` WHERE `username` = '$username' AND `password` = '$password'";
    $result = mysqli_query($conn,$sql);
    $check=mysqli_num_rows($result);
    $arr="";
    if($check==0){
        $arr=["0"];
    }else{
        $arr=["1"];
    }
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>