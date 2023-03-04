const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req,res) => {

    // Existing User Check
    // Hashed Password
    // user creation
    // token generate

    const {username,email,password} = req.body;

    try {
        // Existing User Check
        const existinguser = await userModel.findOne({email:email});
        /*
        as findOne() function is going to connect with the database, so it
        will take some time to return the response or output or result, so 
        that's why we have used await keyword so that program can wait till
        we get the output from the database.
        */
        // To use await keyword , the parent function should be async.

        if(existinguser)
        {
            return res.status(400).json({message:"user already exists"});
        }
        // Hashed Password
        const hashedPassword = await bcrypt.hash(password,10);
        //here password is the string to be hashed and 10 is the no. of rounds to be executed to hash the password.
        // await is used because bcrypt is asynchronous function.

        // user creation
        const result = await userModel.create({
            email:email,
            password:hashedPassword,
            username:username,
        });

        // token generate
        const token = jwt.sign({email:result.email, id:result._id},SECRET_KEY);
        // In result._id , _id is the unique id that is generated after creating the user in Database.
        // here sign() function is a function of jwt , that will generate the token for the given payload or values.
        /*
        => Tokens are used to validate the user.
        => While signup , the token will be generated according to the information provided.
        => Then , the user can access the notes using the token by decrypting the token for userId.
        */
        res.status(200).json({user:result,token:token});//200 => record is created successfully.
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});//500 => Some Error occured.
    }

}

const signin = async (req,res) => {
    
    const {email,password} = req.body;

    try {
        const existinguser = await userModel.findOne({email:email});
        if(!existinguser)
        {
            return res.status(404).json({message:"user not found"});
        }
        
        const matchPassword = await bcrypt.compare(password,existinguser.password);
        if(!matchPassword)
        {
            return res.status(400).json({message:"Invalid credentials"});
        }
        
        const token = jwt.sign({email:existinguser.email, id:existinguser._id},SECRET_KEY);
        res.status(200).json({user:existinguser,token:token});

       
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }

}

module.exports = {signin,signup};