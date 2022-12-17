/*const notes=[{
    noteId:11,
    noteDescription:"This is 1st note"
},{
    noteId:22,
    noteDescription:"This is 2nd note"
},{
    noteId:33,
    noteDescription:"This is 3rd note"
},]*/

let getNotes=()=>notes;

module.exports={getNotes};
const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    note_id INT NOT NULL AUTO_INCREMENT,
    note VARCHAR(255),
    user_id INT NOT NULL,
    CONSTRAINT note_PK PRIMARY KEY(note_id),
    CONSTRAINT note_FK FOREIGN KEY(note_id) references users(user_id)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all notes in database
async function getAllNotes() {
  const sql = `SELECT * FROM notes;`;
  let notes = await con.query(sql);
  console.log(notes)
}
getAllNotes();

 //create notes
 async function createNote(note){
  
  let sql=`INSERT INTO notes (user_id,note) VALUES ("${note.user_id}", "${note.note}");`

 await con.query(sql);
return {message:"Successfully added notes"};

}

// Read Note
async function Read(note) { //content:"hello world"
  let cNote = await getNote(note); 
  if(!cNote[0]) throw Error("Note ID not found");
  return cNote[0];
}

// Update Note function
async function editNotes(note) {
  let sql = `UPDATE notes 
    SET note = "${note.note}"
    WHERE user_id = ${note.user_id}
  `;

  await con.query(sql);
  let updatedNote = await getNote(note);
  return updatedNote[0];
}

// Delete Note function
async function deleteNote(note) {
  let sql = `DELETE FROM notes
    WHERE user = ${note.user_id}
  `
  await con.query(sql);
}

// Useful Functions
async function getNote(note) {
  let sql;

  if(note.user_id) {
    sql = `
      SELECT * FROM notes
       WHERE user_id = "${note.user_id}"
    `
  } else {
    sql = `
    SELECT * FROM notes 
      WHERE note_id = "${note.note_id}"
  `;
  }
  return await con.query(sql);  
}

module.exports = { getAllNotes,getNote, Read, editNotes, deleteNote};