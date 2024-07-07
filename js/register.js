let form = document.getElementsByClassName("form")[0];

let firstName = document.getElementById("firstName");
let spanFirstName = document.getElementById("span-first-name");
let rejxname = /^[a-zA-Z ]{2,30}$/;

let lastName = document.getElementById("lastName");
let spanLastName = document.getElementById("span-last-name");

let email = document.getElementById("email");
let regxEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
let spanEmail = document.getElementById("span-email");

let passWord = document.getElementById("password");
let rejxPass = /^(?=.*[0-9]).*$/;
let spanPass = document.getElementById("span-pw");

let reEnterPass = document.getElementById("reEnterPassword");
let spanReEnterPw = document.getElementById("span-reEnter");
let err = false;

function validation(event) {
  event.preventDefault();

  if (firstName.value === "") {
    spanFirstName.textContent = "Required!";
    err = true;
  } else if (!rejxname.test(firstName.value)) {
    spanFirstName.textContent = "Enter A Character!";
    err = true;
  } else {
    spanFirstName.textContent = "";
    err = false;
  }

  if (lastName.value === "") {
    spanLastName.textContent = "Required!";
    err = true;
  } else if (!rejxname.test(lastName.value)) {
    spanLastName.textContent = "Enter A Character!";
    err = true;
  } else {
    spanLastName.textContent = "";
    err = false;
  }

  if (email.value === "") {
    spanEmail.textContent = "Required!";
    err = true;
  } else if (!regxEmail.test(email.value)) {
    spanEmail.textContent = "Enter A Character!";
    err = true;
  } else {
    spanEmail.textContent = "";
    err = false;
  }

  if (passWord.value === "") {
    spanPass.textContent = "Required!";
    err = true;
  } else if (!rejxPass.test(passWord.value)) {
    spanPass.textContent = "Enter A Password!";
    err = true;
  } else {
    spanPass.textContent = "";
    err = false;
  }

  if (reEnterPass.value === "") {
    spanPass.textContent = "Required!";
    err = true;
  } else if (reEnterPass.value !== passWord.value) {
    spanReEnterPw.textContent = "Passwords do not match!";
    err = true;
  } else {
    spanPass.textContent = "";
    err = false;
  }

  if (!err) {
    const u = new User(
      firstName.value,
      lastName.value,
      email.value,
      passWord.value
    );
    let users = getUsersArr();
    users.push(u);
    localStorage.setItem("users", JSON.stringify(users));
  }
}
function getUsersArr() {
  let users = localStorage.getItem("users");
  return users ? JSON.parse(users) : []; // law fe users array hatha lw mafesh e3mle array
}

form.addEventListener("submit", validation);

class User {
  constructor(f, l, e, p) {
    this.firstName = f;
    this.lastName = l;
    this.email = e;
    this.password = p;
  }
}
