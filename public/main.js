async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}

 class User {
    constructor(Username , password,firstName,lastName) {
      this.setEmail(Username)
      this.setPassword(password)
      this.setFirstName(firstName)
      this.setLastName(lastName)
    }
    getUsername() { return this.Username; }
    getPassword() { return this.password; }
    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    setUsername(Username) { this.Username = Username; }
    setPassword(password) { this.password = password; }
    setFirstName(firstName) { this.firstName = firstName;}
    setLastName(lastName) { this.lastName = lastName;}
  }


  let rForm = document.getElementById("register-form");
  if(rForm) rForm.addEventListener('submit', register);
  
  function register(e) {
    e.preventDefault();
  
    let Username = document.getElementById("username").value;
    let firstname = document.getElementById("fname").value;
    let  lastname = document.getElementById("Lname").value;
    let password = document.getElementById("password").value;
    let user = new User(Username, password,firstname, lastname);
    //console.log(user)
    fetchData("/users/register", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      
      window.location.href = "note.html";
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  let lForm = document.getElementById("login-page");
  if(lForm) lForm.addEventListener('submit', login);
  
  function login(e) {
    e.preventDefault();
  
    let Username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = new User(Username,password);
    
  //console.log(user)
    fetchData("/users/login", user, "POST")
    .then((data) => {
      setCurrentUser(data);
      alert("Successfully logged-in")
      window.location.href = "note.html";
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    }) 
  }
    


  class Note {
    constructor(note) {
      this.setNote(note)
    }
    getNote() { return this.note; }
    setNote(note) { this.note = note; }
  }


let note = document.getElementById("noteform");
if(note) note.addEventListener('submit',notePageFunction)
function notePageFunction(e){
    e.preventDefault();
    let notey= document.getElementById('note').value;
    const note = new Note(notey);
    let user=getCurrentUser();
    note.userID = user.userID;
    fetchData("/notes/create", note, "POST")
    .then((data) => {
      //setCurrentUser(data);

      window.location.href = "note.html";
    })
    .catch((err) =>{
      console.log(err);
    })
 document.getElementById("noteform").reset();
}

  // logout event listener
  let logout = document.getElementById("logout-btn");
  if(logout) logout.addEventListener('click', removeCurrentUser)
  
  // stateful mechanism for user
  // logging in a user
  function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  // getting current user function
  // FIX this next class
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  // logout function for current user
  function removeCurrentUser() {
    localStorage.removeItem('user');
    window.location.href="login.html";
  }

