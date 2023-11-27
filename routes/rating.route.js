const express = require("express");
const authenticate = require("../middleware/authenticate");
const validateRole = require("../middleware/role.auth");
const { addRating } = require("../controller/rating.controller");

const ratingRouter = express.Router();

const validateUserRole = validateRole(["user"]);

ratingRouter.post("/add/:productId", authenticate, validateUserRole, addRating )

module.exports = ratingRouter;
