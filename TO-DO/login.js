// window.onload = function(){
//     if(localStorage.getItem("email") != ""){
//         window.location.assign("index.html");
//     }
// }




function handleCredentialResponse(response) {

    const responsePayload = jwt_decode(response.credential);
    localStorage.setItem("Id", responsePayload.sub);
    localStorage.setItem("fullname", responsePayload.name);
    localStorage.setItem("email", responsePayload.email);
    localStorage.setItem("fname", responsePayload.given_name);
    localStorage.setItem("lname", responsePayload.family_name);
    localStorage.setItem("pfp", responsePayload.picture);
    localStorage.setItem("login_type", "google")

    document.cookie = "Id="+responsePayload.sub;
    document.cookie = "FullName="+responsePayload.name;
    document.cookie = "Email="+responsePayload.email;
    document.cookie = "Pfp="+responsePayload.picture;
    document.cookie = "LoginType=google";
    window.location.assign("database.php");

    
}


