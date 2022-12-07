const notes=[{
    noteId:11,
    noteDescription:"This is 1st note"
},{
    noteId:22,
    noteDescription:"This is 2nd note"
},{
    noteId:33,
    noteDescription:"This is 3rd note"
},]

let getNotes=()=>notes;

module.exports={getNotes};
const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS notes (
    noteID INT NOT NULL AUTO_INCREMENT,
    noteContent VARCHAR(255),
    userID INT NOT NULL,
    CONSTRAINT notePK PRIMARY KEY(noteID),
    CONSTRAINT noteFK FOREIGN KEY(noteID) references users(userID)
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


// Read Note
async function Read(note) { //content:"hello world"
  let cNote = await getNote(note); 
  if(!cNote[0]) throw Error("NoteID not found");
  return cNote[0];
}

// Update Note function
async function editNotes(note) {
  let sql = `UPDATE notes 
    SET noteContent = "${note.noteContent}"
    WHERE userID = ${note.user_id}
  `;

  await con.query(sql);
  let updatedNote = await getNote(note);
  return updatedNote[0];
}

// Delete Note function
async function deleteNote(note) {
  let sql = `DELETE FROM notes
    WHERE userID = ${note.user_id}
  `
  await con.query(sql);
}

// Useful Functions
async function getNote(note) {
  let sql;

  if(note.userID) {
    sql = `
      SELECT * FROM notes
       WHERE userID = "${note.user_id}"
    `
  } else {
    sql = `
    SELECT * FROM notes 
      WHERE noteID = "${note.noteID}"
  `;
  }
  return await con.query(sql);  
}

module.exports = { getAllNotes,getNote, Read, editNotes, deleteNote};