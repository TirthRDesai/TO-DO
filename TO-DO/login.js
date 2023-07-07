window.onload = function(){
    if(localStorage.getItem("email") != null && localStorage.getItem('email') != "" ){
        window.location.assign("index.html");
    }
};

function loginGoogle(){
    console.log('hello');
    document.getElementById('myid').click();
}


function handleCredentialResponse(response) {

    const responsePayload = jwt_decode(response.credential);
    localStorage.setItem("Id", responsePayload.sub);
    localStorage.setItem("fullname", responsePayload.name);
    localStorage.setItem("email", responsePayload.email);
    localStorage.setItem("pfp", responsePayload.picture);
    localStorage.setItem("login_type", "google");
    localStorage.setItem("selected", "My Day");
    
    document.cookie = "Id="+responsePayload.sub;
    document.cookie = "FullName="+responsePayload.name;
    document.cookie = "Email="+responsePayload.email;
    document.cookie = "Pfp="+responsePayload.picture;
    document.cookie = "LoginType=google";
    window.location.assign("database.php");

    
}


function submitForm(){
    var email = document.getElementById('email_id_inp').value;
    var pwd = document.getElementById('password_inp').value;
    jQuery.ajax({
        type: 'POST',
        data : {'email': email, 'pwd': pwd},
        dataType : 'html',
        url : 'loginDatabase.php',
        success: function(d){
            if(d.split("||").length > 2)
            {
                checkUser(d);
            }
            else{
                alert("USER NOT FOUND");
            }
        }
    });
}

function checkUser(result){
    var id = result.split("||")[0];
    var name = result.split("||")[1];
    var email = result.split("||")[2];
    var pfp = result.split("||")[3];
    var extralists = result.split("||")[4];

    localStorage.setItem("Id", id);
    localStorage.setItem("fullname", name);
    localStorage.setItem("email", email);
    localStorage.setItem("pfp", pfp);
    localStorage.setItem("login_type", "form");
    localStorage.setItem("ExtraLists", extralists);

    window.location.assign('index.html');

}


function forgotPassword(){
    document.getElementById("forgot_password_span").style.display = "none";
    document.getElementById("password_label").style.display = "none";
    document.getElementById("password_inp").style.display = "none";
    document.getElementById("login_btn_div").style.display = "none";
    document.getElementById("new_user_span").style.display = "none";

    document.getElementById("submitform").value = "SEND OTP";
    document.getElementById("submitform").onclick = sendOTP();
    document.getElementById("submitform").style.marginTop = "-50px";
}

function sendOTP(){
    var email = document.getElementById("email_id_inp").value;
    
}