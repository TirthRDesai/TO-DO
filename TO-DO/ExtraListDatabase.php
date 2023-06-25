<?php
    $extralists = $_POST['extralists'];
    $email = $_POST['email'];
    $conn = new mysqli("localhost", "root", "", "to-do");
    if(!$conn){
        echo "<script>alert('Error Occurred While Connecting To Database');</script>";
        echo '<script>var Cookies = document.cookie.split(";");
        for (var i = 0; i < Cookies.length; i++)
        {
            document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
        }
        localStorage.clear();</script>';
        echo "<script>window.location.assign('login.php');</script>";
    }
    
    $query = "UPDATE `user_records` SET `EXTRALISTS`= $extralists WHERE EMAIL = '$email'";
    
    mysqli_query($conn, $query);
    mysqli_close($conn);


?>