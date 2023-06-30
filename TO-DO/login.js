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
    localStorage.setItem("fname", responsePayload.given_name);
    localStorage.setItem("lname", responsePayload.family_name);
    localStorage.setItem("pfp", responsePayload.picture);
    localStorage.setItem("login_type", "google")
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
            checkUser(d);
        }
    });
}

function checkUser(result){
    console.log(result);
}