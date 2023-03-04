const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,// we have to refer the object id of the user into the note collection.
        ref:"User",//ref property defines that the object id is of User type or User.
        required:true,
    }
},{timestamps : true}
);

module.exports = mongoose.model("Note",NoteSchema);