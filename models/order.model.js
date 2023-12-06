const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema(
  {
    orderItem: [
      {
        product: {
          type: Object,
        },
        productSize: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1, // Default quantity is 1
          min: 1,
        },
      },
    ],
    deliveryAddress: {
      type: String,
      require: true,
    },
    stripePaymentId: {
      type: String
    }, 
    paymentStatus: {
      type: String,
    },
    orderStatus: {
      type: String,
    },
    totalOrderPrice: {
      type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema, "order");

module.exports = Order;
