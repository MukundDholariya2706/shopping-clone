const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const sendResponse = require("../services/common.service");
const {
  userIsExistSerivce,
  saveUserService,
} = require("../services/user.service");
const { findRole } = require("../services/role.service");

// login function
const userLogin = async (req, res) => {
  try {
    const reqBody = req.body;
    let user = await userIsExistSerivce({ email: reqBody.email });
    user = await user.populate("role", ["name"]);

    // User is not exist
    if (!user) {
      return sendResponse(res, 404, false, "User does not exist.", null);
    }

    // User is exist
    if (user) {
      // password is not same
      if (!bcrypt.compareSync(reqBody.password, user.password)) {
        return sendResponse(res, 400, false, "Password is invalid", null);
      }

      // create token
      const token = await user.generateAuthToken();

      user = user.toObject();
      user = { ...user };
      delete user.password;
      delete user.auth_token;

      return sendResponse(res, 200, true, "Login successfully", {
        user,
        token,
      });
    }
  } catch (error) {
    console.log("user.controller -> userLogin", error);
    return sendResponse(res, 500, false, "Something went wrong!", {
      message: error.message,
    });
  }
};

// register user function
const createUser = async (req, res) => {
  try {
    const reqBody = req.body;

    let existingUser = await userIsExistSerivce({ email: reqBody.email });
    if (existingUser) {
      return sendResponse(res, 400, false, "Duplicate email found", null);
    }

    reqBody.password = await bcrypt.hash(reqBody.password, 10);
    const userRole = await findRole({ name: "user" });
    reqBody.role = userRole._id;
    await saveUserService(reqBody);

    return sendResponse(res, 200, true, "User created successfully", null);
  } catch (error) {
    console.log("user.controller -> createUser", error);
    return sendResponse(res, 500, false, "Something went wrong!", {
      message: error.message,
    });
  }
};

// register Seller
const createSeller = async (req, res) => {
  try {
    const reqBody = req.body;
    let existingUser = await userIsExistSerivce({ email: reqBody.email });
    if (existingUser) {
      return sendResponse(res, 400, false, "Duplicate email found", null);
    }

    reqBody.password = await bcrypt.hash(reqBody.password, 10);
    const userRole = await findRole({ name: "seller" });
    reqBody.role = userRole._id;
    await saveUserService(reqBody);

    return sendResponse(res, 200, true, "Seller created successfully", null);
  } catch (error) {
    console.log("user.controller -> createSeller", error);
    return sendResponse(res, 500, false, "Something went wrong!", {
      message: error.message,
    });
  }
};

module.exports = {
  userLogin,
  createUser,
  createSeller,
};
