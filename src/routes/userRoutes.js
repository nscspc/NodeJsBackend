const express = require("express");
const { signup, signin } = require("../controller/userController");
const userRouter = express.Router();// userRouter is the object of Router.

userRouter.post("/signup",signup);

userRouter.post("/signin",signin);

module.exports = userRouter;// we export it so that we can use it in another files