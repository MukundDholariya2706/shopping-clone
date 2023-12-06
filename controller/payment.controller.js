const { STRIPE_SECRET_KEY } = require("../keys/development.keys");
const { sendResponse } = require("../services/common.service");

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const craetePayment = async (req, res) => {
  try {
    const resBody = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: resBody.amount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return sendResponse(res, 200, true, "", {client_secret: paymentIntent.client_secret});
  } catch (error) {
    console.log(error, "error");
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};


module.exports = {
  craetePayment,
};
