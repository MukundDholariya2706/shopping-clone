const UserRouter = require("./swaggerHelpers/user.swagger");
const AdminRouter = require("./swaggerHelpers/admin.swagger");
const ProductRouter = require("./swaggerHelpers/product.swagger");
const CartRouter = require("./swaggerHelpers/cart.swagger");
const OrderRouter = require("./swaggerHelpers/order.swagger");
const RatingRouter = require("./swaggerHelpers/rating.swagger");

const swaggerDoc = {
  openapi: "3.0.0",
  host: "",
  info: {
    title: "Shopping clone swagger",
    version: "1.1",
    description: "Shopping clone swagger. ",
  },
  servers: [
    {
      url: "http://172.16.0.210:3001",
      description: "Local Server",
    },
  ],
  tags: [
    {
      name: "User",
      description: "Users All API Route",
    },
    {
      name: "Admin",
      description: "Admin All API Route",
    },
    {
      name: "Product",
      description: "Product All API Route",
    },
    {
      name: "Cart",
      description: "Cart All API Route",
    },
    {
      name: "Order",
      description: "Order All API Route"
    },
    {
      name: "Rating",
      description: "Rating All API Route",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },

  paths: {
    ...UserRouter,
    ...AdminRouter,
    ...ProductRouter,
    ...CartRouter,
    ...OrderRouter,
    ...RatingRouter
  },
};

module.exports = swaggerDoc;
