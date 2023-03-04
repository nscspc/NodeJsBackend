// console.log("Hello world");

const express = require("express");
const app = express();// app is an object of express.
const quotes = require("./quotes.json");
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const dotenv = require("dotenv");


app.get("/", (req,res) => {
    res.send("Hello world");
})

app.get("/quote", (req,res) => {
    res.send(("quote"));
})

app.get("/quotes", (req,res) => {
    res.json(quotes);
})

app.get("/quotes_with_status", (req,res) => {
    res.status(200).json(quotes);
})

app.get("/randomquote", (req,res) => {
    let index = Math.floor(Math.random() * quotes.length); //To generate random number in the given range(quotes.length) the result will be in decimal so using floor function we can get the int value.
    let quote = quotes[index];
    res.status(200).json(quote);
})

//--------------------------------------------------------

dotenv.config();

const mongoose = require("mongoose");// mongoose is a package which is used to connect to mongodb.

app.use(express.json());// it is used to pass the request body into json form., so that we can access the response directly.

app.use(cors());// cors() adds header to the response from the api , so that api can be called from every place.

app.use((req,res,next)=>{
    console.log("HTTP Method - "+ req.method+ ",URL - "+ req.url);
    next();
});

app.use("/users",userRouter);
app.use("/note",noteRouter);

app.get("/",(req,res)=>{
    res.send("Notes Api");
})

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://saininaveen933:naveen1234@cluster0.0gsvxzs.mongodb.net/?retryWrites=true&w=majority")//("mongodb+srv://saininaveen933:naveen1234@cluster0.0gsvxzs.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{ //Here then( ) is a callback function which is executed when the connection is successful in this case. And , if any error then catch( ) function is executed.
    // app.listen(PORT , ()=>{
    //     console.log("Server started at port no. "+PORT);
    // });
    exports.app = functions.https.onRequest(app);
})
.catch((error)=>{
    console.log(error);
})