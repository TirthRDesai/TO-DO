<?php
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];
    


    $conn = new mysqli("localhost", "root", "", "to-do");
    if(!$conn){
        echo "CONNECTION FAILED";
    }
    else{
        if(str_starts_with($email , 'F-') || str_starts_with($email, 'G-'))
        {
            $query = "SELECT * FROM `user_records` WHERE `ID` = '$email'";

        }
        else{
            $query = "SELECT * FROM `user_records` WHERE `EMAIL` = '$email'";
        }

        $result = mysqli_query($conn, $query);
        

    }


?>