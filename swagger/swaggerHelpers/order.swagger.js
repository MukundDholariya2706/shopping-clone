const place_order = {
  tags: ["Order"],
  description: "Place a Order",
  summary: "Place a Order",
  security: [
    {
      bearerAuth: [],
    },
  ],

  parameters: [
    {
      name: "cartId",
      in: "path",
      description: "cart Id",
      required: true,
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

const OrderRouter = {
  "/order/placeorder/{cartId}": {
    post: place_order,
  },
};

module.exports = OrderRouter;
