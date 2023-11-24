const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({
  cartItem: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      productSize: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1, // Default quantity is 1
        min: 1,
      },
    },
  ],
  cartOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Cart = mongoose.model("cart", cartSchema, "cart");

module.exports = Cart;
