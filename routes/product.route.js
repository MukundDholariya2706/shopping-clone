const express = require("express");
const authenticate = require("../middleware/authenticate");
const validateRole = require("../middleware/role.auth");
const {
  addProduct,
  deleteProduct,
  uploadImages,
  getProductList
} = require("../controller/product.controller");
const { uploadError } = require("../services/common.service");
const { upload, multerConfig } = require("../services/multer.service");
const productRouter = express.Router();

const validateAdminRole = validateRole(["seller"]);

productRouter.get("/get-product", authenticate, getProductList);

productRouter.post("/add-product", authenticate, validateAdminRole, addProduct);
productRouter.delete(
  "/delete-product/:id",
  authenticate,
  validateAdminRole,
  deleteProduct
);
productRouter.post(
  "/product-image/:productId",
  authenticate,
  validateAdminRole,
  multerConfig(1, [".jpg", ".jpeg", ".png"]).array("productImages", 5),
  // upload.array("productImages", 5),
  uploadError,
  uploadImages
);

module.exports = productRouter;
