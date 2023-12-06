const express = require("express");
const userRouter = require("./user.route");
const productRouter = require("./product.route");
const adminRouter = require("./admin.route");
const cartRouter = require("./cart.route");
const orderRouter = require("./order.route");
const ratingRouter = require("./rating.route");
const paymentRouter = require("./payment.route");

// Root Route
const RootRouter = express.Router();

// Other Routes
RootRouter.use("/user", userRouter);
RootRouter.use("/admin", adminRouter);
RootRouter.use("/product", productRouter);
RootRouter.use("/cart", cartRouter);
RootRouter.use("/order", orderRouter);
RootRouter.use("/rating", ratingRouter)
RootRouter.use("/payment", paymentRouter)

module.exports = RootRouter;
