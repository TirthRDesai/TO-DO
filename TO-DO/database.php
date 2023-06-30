<?php

    if(isset($_COOKIE['Id'])){

        $id = $_COOKIE['Id'];
        $name = $_COOKIE['FullName'];
        $email = $_COOKIE['Email'];
        $logintype = $_COOKIE['LoginType'];
        if($logintype == "google")  
        {
            $password = "";
            $pfp = $_COOKIE['Pfp'];
            $id = "G-$id";
        }
        else{
            $password = $_COOKIE['Password'];
            $pfp = "";
            
        }


        $conn = new mysqli("localhost", "root", "", "to-do");
        if(!$conn){
            echo "<script>alert('Error Occurred While Connecting To Database');</script>";
            echo '<script>var Cookies = document.cookie.split(";");
            for (var i = 0; i < Cookies.length; i++)
            {
               document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
            }
           localStorage.clear();</script>';
            echo "<script>window.location.assign('login.html');</script>";
        }

        $query = "select * from `user_records` where EMAIL = '$email'";
        $result = mysqli_query($conn, $query);
        if (mysqli_num_rows($result) == 0){
            $query = "INSERT INTO `user_records` VALUES('$id', '$name','$logintype', '$email','$password','$pfp', '')";
            if (mysqli_query($conn, $query)){
                echo "<script>window.location.assign('index.html');</script>";
            }
        }
        else{
            $row = mysqli_fetch_array($result);
            $extralist = $row['EXTRALISTS'];
            $pfp = $row['PROFILE_PIC'];
            $id = $row['ID'];
            echo "<script>localStorage.setItem('ExtraLists','$extralist');</script>";
            echo "<script>localStorage.setItem('pfp','$pfp');</script>";
            echo "<script>localStorage.setItem('Id','$id');</script>";
            echo "<script>window.location.assign('index.html');</script>";
        }
        mysqli_close($conn);
    
    }
    else{
        echo "<script>window.location.assign('login.html');</script>";
    }
    
?>