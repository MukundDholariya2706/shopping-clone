const express = require("express");
const authenticate = require("../middleware/authenticate");
const {
  getCartList,
  addToCart,
  updateCartItem,
} = require("../controller/cart.controller");

const cartRouter = express.Router();

cartRouter.get("/list", authenticate, getCartList);
cartRouter.post("/addToCart", authenticate, addToCart);
cartRouter.put("/updateCartItem/:cartId", authenticate, updateCartItem);

module.exports = cartRouter;
