 // getUsers button 
 document.getElementById("btn-users").addEventListener('click', getUsers);

 function getUsers() {
  fetch("http://localhost:3000/users/")
  .then((res)=> res.json())
   .then((data) => console.log(data))
   .catch((err)=> console.log(err))
 }



 class User {
    constructor(Username , password) {
      this.setEmail(Username)
      this.setPassword(password)
    }
    getUsername() { return this.Username; }
    getPassword() { return this.password; }
    setUsername(Username) { this.Username = Username; }
    setPassword(password) { this.password = password; }
  }


  class Register {
    constructor(email , password,firstName,lastName) {
      this.setEmail(email)
      this.setPassword(password)
      this.setFirstName(firstName)
      this.setLastName(lastName)
    }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }
    setFirstName(firstName) { this.firstName = firstName;}
    setLastName(lastName) { this.lastName = lastName;}
  }


  class Note {
    constructor(note) {
      this.setNote(note)
    }
    getNote() { return this.note; }
    setNote(note) { this.note = note; }
  }


  
function getLoginData(){
console.log("Fetching login data information...")
const user = new User(document.getElementById("username").value, document.getElementById("password").value);
console.log("The user id is : ",user.getUsernamemail());
console.log("The password is : ",user.getPassword() );
}

function getRegestrationsData(){
    console.log("Fetching Register data information...")
    const register = new Register(document.getElementById("email").value, document.getElementById("psw").value,document.getElementById("first_name").value,document.getElementById("last_name").value);
    console.log("The email id is : ",register.getEmail());
    console.log("The password data is : ",register.getPassword());
    console.log("The first name data is : ",register.getFirstName());
    
    console.log("The last name  data is : ",register.getLastName());
    
}

function getNoteData(){
console.log("Fetching note data information...")
const note = new Note(document.getElementById("note").value);
console.log("The note data is : ",note.getNote());
}
/****************** */

const usersBtn=document.getElementById("users-btn");

if(usersBtn)usersBtn.addEventListener('click',getUsers);

function getUsers(){
    fetch("http://localhost:3000/users/")
    .then((res)=>res.json())
    .then((data)=>{
        
        let ul=document.getElementById("allUsers");

        data.forEach((user)=>{
            let li=document.createElement('li');
            let text=document.createTextNode(user.userName);

            li.appendChild(text);
            ul.appendChild(li);
        })
    })

    .catch((err)=>console.log(`error! ${err}`));
}

const notesBtn=document.getElementById("notes-btn");
if(notesBtn)notesBtn.addEventListener('click',getNotes);

 function getNotes(){
     fetch("http://localhost:3000/notes/")
     .then((res)=>res.json())
     .then((data)=>{
         let ul=document.getElementById("allNotes");

         data.forEach((note)=>{
             let li=document.createElement('li');
             let text=document.createTextNode(note.noteDescription);
             li.appendChild(text);
             ul.appendChild(li);

         })


     })
     .catch((err)=>console.log(`Error! ${err}`));
 }
