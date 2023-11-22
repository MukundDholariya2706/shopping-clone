const Product = require("../models/product.model");

const saveProduct = async (data) => {
  try {
    return await Product.create(data);
  } catch (error) {
    console.log("product.service -> saveProduct", error);
    throw error;
  }
};

const findProduct = async (query) => {
  try {
    return await Product.aggregate(query);
  } catch (error) {
    console.log("product.service -> findProduct", error);
    throw error;
  }
};

const deleteProductService = async (productId) => {
  try {
    return await Product.findByIdAndDelete(productId);
  } catch (error) {
    console.log("product.service -> deleteProduct", error);
    throw error;
  }
};

const updateProductService = async (query, productData) => {
  try {
    return await Product.findOneAndUpdate(query, productData, { new: true });
  } catch (error) {
    console.log("product.service -> updateProduct", error);
    throw error;
  }
};

const listProductService = async (query) => {
  try {
    return await Product.aggregate(query);
  } catch (error) {
    console.log("product.service -> listProductService", error);
  }
};

module.exports = {
  saveProduct,
  findProduct,
  deleteProductService,
  updateProductService,
  listProductService,
};
