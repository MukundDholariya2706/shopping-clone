const Order = require("../models/order.model");

const saveOrderService = async (data) => {
  try {
    return await Order.create(data);
  } catch (error) {
    console.log("order.service -> saveOrderService", error);
    throw error;
  }
};

module.exports = {
  saveOrderService,
};
