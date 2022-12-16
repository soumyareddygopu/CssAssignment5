import { fetchData, getCurrentUser, setCurrentUser} from "./main.js";
// user class
class User {
  constructor(username, password, fullname) {
    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  getUsername() {
    return this.username;
  }
}

// login functionality
let loginForm = document.getElementById("lpage");
if(loginForm) loginForm.addEventListener('submit', login);

function login(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let user = new User(username, password);

  fetchData("/users/login", user, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "note.html";
  })
  .catch((err) => {
    console.log(`Error!!! ${err.message}`)
  }) 
}
 
// register functionality
let regForm = document.getElementById("rpage");
if(regForm) regForm.addEventListener('submit', register);

function register(e) {
  e.preventDefault();
  let fullname = document.getElementById("fullname").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let user = new User(username, password, fullname);
  console.log(user);
  fetchData("/users/register", user, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "note.html";
  })
  .catch((err) =>{
    console.log(err);
  })
}