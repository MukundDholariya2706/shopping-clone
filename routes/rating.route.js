const express = require("express");
const authenticate = require("../middleware/authenticate");
const validateRole = require("../middleware/role.auth");
const {
  addRating,
  updateRating,
  getRatingData,
  deleteRating,
} = require("../controller/rating.controller");

const ratingRouter = express.Router();

const validateUserRole = validateRole(["user"]);

ratingRouter.post("/add/:productId", authenticate, validateUserRole, addRating);
ratingRouter.put(
  "/update/:ratingId",
  authenticate,
  validateUserRole,
  updateRating
);
ratingRouter.get("/getRating/:productId", authenticate, getRatingData);
ratingRouter.delete("/delete-rating/:ratingId", authenticate, deleteRating);

module.exports = ratingRouter;
