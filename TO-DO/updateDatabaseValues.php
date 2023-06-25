<?php

    $email = $_POST['email'];
    $task = $_POST['task'];
    $status = $_POST['status'];
    $selected = $_POST['selected'];


    $conn = new mysqli ("localhost", "root", "", "to-do");

    if(!$conn){
        echo "FAILED TO CONNECT DATABASE";
    }

    $query = "UPDATE `tasks` SET `STATUS` = '$status' WHERE `EMAIL` = '$email' AND `EXTRA_LIST_NAME` = '$selected' AND `TASK` = '$task'";
    mysqli_query($conn, $query);

    echo "done";

    mysqli_close($conn);

?>