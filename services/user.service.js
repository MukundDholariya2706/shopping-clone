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

const getAllUserList = async (query) => {
  try {
    return await User.aggregate(query);
  } catch (error) {
    console.log("user.service -> getAllUserList", error);
    throw error;
  }
};

const deleteUserById = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    console.log("user.service -> deleteUserById", error);
    throw error;
  }
}

module.exports = { userIsExistSerivce, saveUserService, getAllUserList, deleteUserById };
