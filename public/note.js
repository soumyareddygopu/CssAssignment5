import { fetchData, getCurrentUser, setCurrentUser, setCurrentNote } from "./validate.js";
let enterNote = document.getElementById("npage");
if(enterNote) enterNote.addEventListener('submit', notef);


  function notef(e){
    e.preventDefault();
    let notes=document.getElementById('note').value;

    let note = new Note(notes);
    let user = getCurrentUser();
    note.userID = user.userID;

    fetchData("/notes/create", note, "POST")
    .then((data) => {
    //setCurrentNote(data);
    setCurrentNote(data);
    window.location.href = "note.html";
    })
    .catch((err) =>{
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
    })

    const Note1 = new Note(notes);
    console.log(Note1);
    window.location.href = "note.html";
    document.getElementById("npage").reset();
}

class Note {
    constructor(note) {
      this.note = note;
      
    }
  
    getNote() {
      return this.note;
    }
  }

  let user = getCurrentUser();
  if(user && enterNote) getNotes();



// 
function getNotes(){
  
  let user = getCurrentUser();
   fetchData("/notes/", user,"post")
   .then((data)=>{
       let ul=document.getElementById("note");

       data.forEach((note)=>{
           let li=document.createElement('li');
           let text=document.createTextNode(note.note);
           li.appendChild(text);
           ul.appendChild(li);

       })
   })
   .catch((err)=>console.log(`Error! ${err}`));

   //window.location.href="note.html";
}