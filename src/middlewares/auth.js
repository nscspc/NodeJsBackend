const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const auth = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(token)
        {
            token = token.split(" ")[1];
            let user = jwt.verify(token , SECRET_KEY);// after verifying the token , we will get all the information of the user.
            req.userId = user.id;
        }
        else
        {
            return res.status(401).json({message:"Unauthorized user"});
        }
        next();// if verification successful.
    } catch (error) {
        res.status(401).json({message:"Unauthorized user"});// 401 => Unauthorized User.s
    }
}

module.exports = auth;

// Middlewares :-
/*
=> Middlewares are used to implement authorization or validation.
=> Middlewares are the security guard that authorizes the user before initiating the request.
=> Middlewares also represents the processes or steps between the pipeline of the request and the response
    -> Eg :- app.use(express.json());
*/