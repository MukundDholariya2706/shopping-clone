const mongoose = require("mongoose");

let ratingSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    rate: {
      type: Number,
      max: 5,
      min: 1,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("rating", ratingSchema, "rating");

module.exports = Rating;
