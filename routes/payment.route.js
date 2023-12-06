const express = require("express");
const { craetePayment } = require("../controller/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post("/create-payment", craetePayment);

module.exports = paymentRouter;
