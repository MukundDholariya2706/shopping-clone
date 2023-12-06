const { STRIPE_SECRET_KEY } = require("../keys/development.keys");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createProductInStripe = async (productDetails) => {
  try {
    console.log(productDetails, "productDetails");
    const product = await stripe.products.create({
      name: productDetails.productName,
      active: true,
      description: productDetails.productDescription,
      images: productDetails.productImages,
    });
    return product;
  } catch (error) {
    console.log("payment.service -> createProductInStripe", error);
    throw error;
  }
};

const updateProductInStripe = async (productId, productDetails) => {
  try {
    const product = await stripe.products.update(
      productId,
      productDetails
    )
    console.log(product, 'product after update');
    return product;
  } catch (error) {
    console.log("payment.service -> updateProductInStripe", error);
    throw error;
  }
};

const deleteProductInStripe = async (produtStripeId) => {
  try {
    await stripe.products.del(produtStripeId, {
      apiKey: STRIPE_SECRET_KEY,
    });
  } catch (error) {
    console.log("payment.service -> deleteProductInStripe", error);
    throw error;
  }
};

module.exports = { createProductInStripe, updateProductInStripe, deleteProductInStripe };
