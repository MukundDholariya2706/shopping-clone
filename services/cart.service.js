const Cart = require("../models/cart.model");

const listCartService = async (searchQuery) => {
  try {
    return await Cart.aggregate(searchQuery);
  } catch {
    console.log("cart.service -> listCartService", error);
    throw error;
  }
};

const saveCartService = async (cartData) => {
  try {
    return await Cart.create(cartData);
  } catch (error) {
    console.log("cart.serivce -> saveCart", error);
    throw error;
  }
};

const updateCartService = async (query, data) => {
  try {
    return await Cart.findOneAndUpdate(query, data);
    return await Cart.updateOne(query);
  } catch (error) {
    console.log("cart.service -> removeItemFromCartService", error);
    throw error;
  }
};

const deleteCartService = async (cartId) => {
  try {
    return await Cart.findByIdAndDelete(cartId);
  } catch (error) {
    console.log("cart.service -> deleteCartService", error);
    throw error;
  }
}

module.exports = {
  listCartService,
  saveCartService,
  updateCartService,
  deleteCartService
};
