const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../controller/noteController");
const noteRouter = express.Router();
const auth = require("../middlewares/auth");

// auth function will be called before the getNotes , createNote , deleteNote , updateNote functions as next() & these functions will get the user id after the verification of token in req.userId(which can be used in those functions). 
noteRouter.get("/",auth,getNotes);

noteRouter.post("/",auth,createNote);

noteRouter.delete("/:id",auth,deleteNote);//Here , id is used in the url to delete and update(put) the note of a particular user .

noteRouter.put("/:id",auth,updateNote);

module.exports = noteRouter;