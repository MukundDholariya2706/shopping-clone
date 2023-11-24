const express = require("express");
const userRouter = require("./user.route");
const productRouter = require("./product.route");
const adminRouter = require("./admin.route");
const cartRouter = require("./cart.route");

// Root Route
const RootRouter = express.Router();

// Other Routes
RootRouter.use("/user", userRouter);
RootRouter.use("/admin", adminRouter);
RootRouter.use("/product", productRouter);
RootRouter.use("/cart", cartRouter);

module.exports = RootRouter;
