const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  productImages: {
    type: [String],
  },
  coverImage: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: [String],
    enum: ["s", "m", "l", "xl"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  ownerDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Product = mongoose.model("product", productSchema, "product");

module.exports = Product;