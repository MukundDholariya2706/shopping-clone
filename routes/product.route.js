const express = require("express");
const authenticate = require("../middleware/authenticate");
const validateRole = require("../middleware/role.auth");
const {
  addProduct,
  deleteProduct,
  uploadImages,
  getProductList,
  sendProductImage
} = require("../controller/product.controller");
const { uploadError } = require("../services/common.service");
const { upload } = require("../services/multer.service");
const productRouter = express.Router();

const validateSellerRole = validateRole(["seller"]);

productRouter.get("/get-product", authenticate, getProductList);

productRouter.post("/add-product", authenticate, validateSellerRole, addProduct);
productRouter.delete(
  "/delete-product/:id",
  authenticate,
  validateSellerRole,
  deleteProduct
);
productRouter.post(
  "/product-image/:productId",
  authenticate,
  validateSellerRole,
  upload.array("productImages", 5),
  uploadError,
  uploadImages
);
productRouter.get("/image/:fileName", sendProductImage)
module.exports = productRouter;
