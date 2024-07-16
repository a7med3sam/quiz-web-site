
import { getUsersArr } from "./helper.js";

let form = document.getElementsByClassName("log-form")[0];

let email = document.getElementById("email");
let spanEmail = document.getElementById("span-email");

let passWord = document.getElementById("password");
let spanPass = document.getElementById("span-pw");




function validate(e){
    e.preventDefault();
    const users = getUsersArr();    
    const user = users.find(u => u.email === email.value && u.password === passWord.value);
   
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
         if (user) {
           location.replace("quiz.html");
         } else {
         spanPass.textContent = "Email & Password Not Valid !";
         }
      }    
}
form.addEventListener("submit", validate);


