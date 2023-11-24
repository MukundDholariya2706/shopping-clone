const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const {
  listCartService,
  saveCartService,
  updateCartService,
  deleteCartService,
} = require("../services/cart.service");
const { sendResponse, ObjectId } = require("../services/common.service");

// cart listing
const getCartList = async (req, res) => {
  try {
    let filterObj = {
      cartOwner: new ObjectId(req.user._id),
    };

    const query = [
      {
        $match: filterObj,
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
    ];

    let cartList = await listCartService(query);

    return sendResponse(
      res,
      200,
      true,
      "CartList fetch successfully!",
      cartList[0]
    );
  } catch (error) {
    console.log("cart.controller ->  getCartList", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// add to cart
const addToCart = async (req, res) => {
  try {
    const body = req.body;


    // checl if the user has an existing cart
    let cart = await Cart.findOne({ cartOwner: req.user._id });

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      cart = new Cart({ cartOwner: req.user._id, cartItem: [] });
    }

    // Check if the product is already in the cart
    const existingCartItem = cart.cartItem.find(
      (item) => item.product.toString() === body.productId.toString()
    );

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity = body.quantity;
    } else {
      // If the product is not in the cart, add a new item
      cart.cartItem.push({
        product: body.productId,
        quantity: body.quantity,
        productSize: body.productSize,
      });
    }

    cart = await saveCartService(cart);

    return sendResponse(res, 200, true, "Item added in cart", cart);
  } catch (error) {
    console.log("cart.controller -> addToCart", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// update cart item
const updateCartItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const { productId, quantity, productSize } = req.body;

    let cart = await listCartService([
      {
        $match: {
          _id: new ObjectId(cartId),
        },
      },
    ]);

    if(cart.length === 0){
      return sendResponse(res, 404, false, "Cart not found!", null);
    }

    cart = { ...cart[0] };
    const existingCartItemIndex = cart.cartItem.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (quantity === 0 && existingCartItemIndex !== -1) {
      if (cart.cartItem.length === 1) {
        await deleteCartService(cartId);
      }
      cart.cartItem.splice(existingCartItemIndex, 1);
    } else if (quantity > 0 && existingCartItemIndex !== -1) {
      cart.cartItem[existingCartItemIndex].quantity =
        quantity || cart.cartItem[existingCartItemIndex].quantity;
      cart.cartItem[existingCartItemIndex].productSize =
        productSize || cart.cartItem[existingCartItemIndex].productSiz;
    }

    // Use updateOne for atomic updates
    const value = await updateCartService(
      { _id: cartId },
      cart
      // { $set: { cartItem: cart.cartItem } }
    );
    return sendResponse(res, 200, true, "Cart update successfully!", cart);
  } catch (error) {
    console.log("cart.controller -> removeItemFromCart", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = { getCartList, addToCart, updateCartItem };
