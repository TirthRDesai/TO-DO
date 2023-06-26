<?php

    $email = $_POST['email'];
    $task = $_POST['task'];
    $status = $_POST['status'];
    $selected = $_POST['selected'];
    $task_id = $_POST['task_id'];


    $conn = new mysqli ("localhost", "root", "", "to-do");

    if(!$conn){
        echo "FAILED TO CONNECT DATABASE";
    }

    $query = "UPDATE `tasks` SET `STATUS` = '$status' WHERE `EMAIL` = '$email' AND `EXTRA_LIST_NAME` = '$selected' AND `TASK_ID` = '$task_id'";
    mysqli_query($conn, $query);


    mysqli_close($conn);
    echo "done";

?>