const User = require("../models/user.model");

const userIsExistSerivce = async (filter) => {
  try {
    return await User.findOne(filter);
  } catch (error) {
    console.log("user.service -> userIsExistSerivce", error);
    throw error;
  }
};

const saveUserService = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    console.log("user.service -> saveUserService", error);
    throw error;
  }
};
module.exports = { userIsExistSerivce, saveUserService };
