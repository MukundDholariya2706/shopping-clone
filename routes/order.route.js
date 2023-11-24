const express = require("express");
const authenticate = require("../middleware/authenticate");
const { placeOrder } = require("../controller/order.controller");
const orderRouter = express.Router();

orderRouter.post('/placeorder/:cartId', authenticate, placeOrder);

module.exports = orderRouter;
placeOrder