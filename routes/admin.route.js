const express = require("express");
const { getUserList, deleteUser } = require("../controller/admin.controller");
const authenticate = require("../middleware/authenticate");
const validateRole = require("../middleware/role.auth");
const adminRouter = express.Router();

const validateAdminRole = validateRole(["super admin"]);

adminRouter.get("/user-list", authenticate, validateAdminRole, getUserList);
adminRouter.delete("/user/:id", authenticate, validateAdminRole, deleteUser);

module.exports = adminRouter;
