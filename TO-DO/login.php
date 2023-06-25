<!DOCTYPE html>
<html lang="en">
<head>
    
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LOGIN</title>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <script src="https://unpkg.com/jwt-decode/build/jwt-decode.js"></script>
      <script type="module">
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
      apiKey: "AIzaSyCqNx2wl2QoRX5ZNlwuISPllISPB0Dxu14",
      authDomain: "login-390209.firebaseapp.com",
      projectId: "login-390209",
      storageBucket: "login-390209.appspot.com",
      messagingSenderId: "1084983487070",
      appId: "1:1084983487070:web:884d9878c45572558d22cf",
      measurementId: "G-4EVFY9SZ39"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      </script>
      <script src="login.js"></script>
</head>
<body>
    <div id="g_id_onload"
        data-client_id="1084983487070-hhh7s4jbd2fh3fqeh7qp3s1cc3fh0vbn.apps.googleusercontent.com"
        data-callback = "handleCredentialResponse"
        data-context="use"
        data-auto_prompt="false">
    </div>

    
<div class="g_id_signin"
data-type="standard"
data-shape="pill"
data-theme="filled_blue"
data-text="signin"
data-size="large"
data-logo_alignment="left"
data-width="150">
</div>
</body>
</html>
