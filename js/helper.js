export function getUsersArr() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : []; 
  }