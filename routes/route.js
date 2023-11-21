const express = require("express");
const userRouter = require("./user.route");

// Root Route
const RootRouter = express.Router();

// Other Routes
RootRouter.use("/user", userRouter);

module.exports = RootRouter;
