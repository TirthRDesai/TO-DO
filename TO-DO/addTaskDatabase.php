<?php

    function generate_task_id($length_of_string)
    {
        $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return substr(str_shuffle($str_result),0, $length_of_string);
    }

    $conn = new mysqli("localhost", "root", "", "to-do");
    if(!$conn){
        echo "ERROR OCCURED WHILE CONNECTING DATABASE";
    }
    else{   
        $email = $_POST['email'];
        $id = $_POST['id'];
        $section = $_POST['section'];
        $task = $_POST['task'];

        $query = "SELECT * FROM `tasks` WHERE `EMAIL` = '$email' AND `EXTRA_LIST_NAME` = '$section'";
        $result = mysqli_query($conn, $query);
        
        $task_id = generate_task_id(10);
        if (mysqli_num_rows($result)>0){
            $task_ids = array();
            while($row = mysqli_fetch_assoc($result))
            {
                array_push($task_ids, $row['TASK_ID']);
            }
            while (true){
                if(in_array($task_id, $task_ids)){
                    $task_id = generate_task_id(10);    
                }
                else{
                    break;
                }
            }
        }
        else{
            $task_id = generate_task_id(10);
        }


        $query = "INSERT INTO `tasks` VALUES ('$id','$email','$section', '$task_id', '$task', 'IC')";
        mysqli_query($conn, $query);

        mysqli_close($conn);
        echo $task_id;
    }




?>