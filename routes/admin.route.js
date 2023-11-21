const express = require("express");
const { getUserList } = require("../controller/admin.controller");
const adminRouter = express.Router();

adminRouter.get("/user-list",getUserList);

module.exports = adminRouter;
