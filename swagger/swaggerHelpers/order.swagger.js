const place_order = {};

const OrderRouter = {
  "/order/placeorder/{cartId}": {
    post: place_order,
  },
};

module.exports = OrderRouter;
