const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
},{timestamps : true}// it will add 2 properties in the schema :- created at and modified at.
);

module.exports = mongoose.model("User",UserSchema);