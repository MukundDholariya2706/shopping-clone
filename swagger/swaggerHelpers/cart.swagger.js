const cart_list = {
  tags: ["Cart"],
  description: "Cart Listing",
  summary: "Cart Listing",
  security: [
    {
      bearerAuth: [],
    },
  ],

  responses: {
    200: {
      description: "ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
  },
};

const add_to_cart = {
  tags: ["Cart"],
  description: "Add product into cart",
  summary: "Add to cart",
  security: [
    {
      bearerAuth: [],
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            productId: {
              type: "string",
              required: true,
              descripition: "Product Id",
            },
            productSize: {
              type: "string",
              required: true,
              descripition: "Product size",
            },
            quantity: {
              type: "number",
              required: true,
              descripition: "Product quantity",
              example: 1,
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
  },
};

const update_cart_item = {
  tags: ["Cart"],
  description: "Update cart",
  summary: "Update cart",
  security: [
    {
      bearerAuth: [],
    },
  ],

  parameters: [
    {
      name: "cartId",
      in: "path",
      description: "Cart Id",
      required: true,
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            productId: {
              type: "string",
              required: true,
              descripition: "Product Id",
            },
            quantity: {
              type: "number",
              required: true,
              descripition: "Product quantity",
              example: 1,
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
  },
};

const CartRouter = {
  "/cart/list": {
    get: cart_list,
  },
  "/cart/addToCart": {
    post: add_to_cart,
  },
  "/cart/updateCartItem/{cartId}": {
    put: update_cart_item,
  },
};

module.exports = CartRouter;
