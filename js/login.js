import {getUsersArr} from "./register.js";

let form = document.getElementsByClassName("form")[0];

let email = document.getElementById("email");
let spanEmail = document.getElementById("span-email");

let passWord = document.getElementById("password");
let spanPass = document.getElementById("span-pw");

function validate(e){
    e.preventDefault();
    if (email.value === "") {
        spanEmail.textContent = "Required!";
        email.style.outline =  "1px solid #d00707";
      } else {
        spanEmail.textContent = "";
      }

      if (passWord.value === "") {
        spanPass.textContent = "Required!";
        passWord.style.outline =  "1px solid #d00707";
      } else {
        spanPass.textContent = "";
      }

     const users = getUsersArr();    
     const user = users.find(u => u.email === email.value && u.password === passWord.value);
    
      if (user) {
        alert("Login successful!");
        
      } else {
        alert("Please try again.");
      }
    
}
form.addEventListener("submit", validate);


