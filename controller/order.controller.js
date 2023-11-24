const { listCartService } = require("../services/cart.service");
const { sendResponse, ObjectId } = require("../services/common.service");
const { saveOrderService } = require("../services/order.service");

// place a order
const placeOrder = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const reqBody = req.body;

    const cart = await listCartService([
      {
        $match: {
          _id: new ObjectId(cartId),
        },
      },
      {
        $unwind: "$cartItem",
      },
      {
        $lookup: {
          from: "product",
          localField: "cartItem.product",
          foreignField: "_id",
          as: "cartItem.product",
        },
      },
      {
        $unwind: "$cartItem.product",
      },
      {
        $group: {
          _id: "$_id",
          cartItem: { $push: "$cartItem" },
        },
      },
      {
        $project: {
          _id: 1,
          cartItem: 1,
        },
      },
    ]);

    let totalOrderPrice = 0;
    cart[0].cartItem.map((item) => {
      totalOrderPrice = totalOrderPrice + item.product.price * item.quantity;
    });

    const data = {
      orderItem: cart[0].cartItem,
      cartDetail: cartId,
      deliveryAddress: reqBody.deliveryAddress,
      paymentStatus: "done",
      orderStatus: "done",
      totalOrderPrice,
      user: req.user._id,
    };

    const order = await saveOrderService(data);
    return sendResponse(res, 200, true, "Order Place succssfully!", order);
  } catch (error) {
    console.log("order.controller -> placeOrder", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
};
