<?php
    $email = $_POST['email'];
    $section = $_POST['section'];
    $task_id = $_POST['task_id'];

    $conn = new mysqli("localhost", "root", "", "to-do");

    if(!$conn){
        echo "ERROR OCCURRED CONNECTING DATABASE";
    }

    else{
        $query = "DELETE FROM `tasks` WHERE `EMAIL` = '$email' AND `EXTRA_LIST_NAME` = '$section' AND `TASK_ID` = '$task_id'";
        mysqli_query($conn, $query);
    }
    mysqli_close($conn);
    echo "SUCCESS";
?>