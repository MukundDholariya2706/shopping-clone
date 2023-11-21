const express = require("express");
const { getUserList } = require("../controller/admin.controller");
const authenticate = require("../middleware/authenticate");
const adminRouter = express.Router();

adminRouter.get("/user-list", authenticate, getUserList);

module.exports = adminRouter;
