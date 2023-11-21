const express = require("express");
const { userLogin , createUser, createSeller } = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/user-register", createUser);
userRouter.post("/seller-register", createSeller);

module.exports = userRouter;
