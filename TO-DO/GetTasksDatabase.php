<?php

    $selected_region = $_POST['selected_region'];
    $email = $_POST['email'];

    $conn = new mysqli("localhost", "root", "", "to-do");
    if(!$conn){
        setcookie("CONNNECTION", "FALSE");
    }

    $query = "select * from `tasks` where EMAIL = '$email' and EXTRA_LIST_NAME = '$selected_region'";
    $completed_task = "";
    $incomplete_task = "";
    $record = "0";
    $inc_task_id = "";
    $com_task_id = "";

    $res = mysqli_query($conn,$query);
    if ($res){
        $count = mysqli_num_rows($res);
        if ($count > 0){
            while($row = mysqli_fetch_assoc($res)){
                if ($row['STATUS'] == "IC"){
                    $incomplete_task .= $row['TASK']."#;#";
                    $inc_task_id .= $row['TASK_ID']."#;#";
                }
                else{
                    $completed_task .= $row['TASK'] . "#;#";
                    $com_task_id .= $row['TASK_ID'] . "#;#";
                }
            }
            
            $record="1";
        }
    }

    mysqli_close($conn);
    // echo $x;
    echo "$record||$incomplete_task||$completed_task||$inc_task_id||$com_task_id";
?>