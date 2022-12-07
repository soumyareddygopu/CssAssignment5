/*
const express=require('express');
const Note=require('../models/note');
const router=express.Router();

router.get('/',(req,res)=>{
    try{
        const notes=Note.getNotes();
        res.send(notes);
    }catch(err){
        res.status(401).send({message: error.message});

    }
});

module.exports=router;
*/
const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const notes = await Note.getAllNotes();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .get('/getNote', async (req, res) => {
    try {
      let note = await Note.getNote(req.body);
      res.send(note)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .put('/editNotes', async (req, res) => {
    try {
      let note = await Note.editNotes(req.body);
      res.send({...user, password: undefined});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      User.deleteNote(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })



  
module.exports = router;