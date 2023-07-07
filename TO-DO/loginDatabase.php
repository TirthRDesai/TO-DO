<?php
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];
    


    $conn = new mysqli("localhost", "root", "", "to-do");
    if(!$conn){
        echo "CONNECTION FAILED";
    }
    else{
        if(str_starts_with($email , 'F-'))
        {
            $query = "SELECT * FROM `user_records` WHERE `ID` = '$email'";

        }
        elseif(str_starts_with($email, 'G-')){
            echo "WRONG FORMAT";
        }
        else{
            $query = "SELECT * FROM `user_records` WHERE `EMAIL` = '$email'";
        }

        $result = mysqli_query($conn, $query);
        $count = mysqli_num_rows($result);
        if($count > 0){
            $data = mysqli_fetch_array($result);
            if($pwd == $data['PASSWORD'] && $data['PASSWORD'] != ""){
                if($data['Login_Type'] == "form"){
                    $id = $data['ID'];
                    $name = $data['NAME'];
                    $email = $data['EMAIL'];
                    $extralists = $data['EXTRALISTS'];
                    $pfp = $data['PROFILE_PIC'];
                    echo "$id||$name||$email||$pfp||$extralists";
                }
                else{
                    echo "RECORD NOT FOUND";
                }


            }
            else{
                echo "INCORRECT PASSWORD";
            }
        }
        else{
            echo "PERSON NOT FOUND PLEASE CHECK YOUR EMAIL ID OR LOGIN ID";
        }

    }


?>