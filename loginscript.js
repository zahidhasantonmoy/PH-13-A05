console.log("Login script loaded");
 const loginBtn = document.getElementById("loginBtn");
 loginBtn.addEventListener("click", function() {
     const username = document.getElementById("username").value;
     const password = document.getElementById("password").value;

     if(username === "admin" && password === "admin123") {
        
            window.location.href = "index.html";
     } else {
         alert("Invalid credentials. Please try again.");
     }
 });