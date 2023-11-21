const sendResponse = require("../services/common.service");

const getUserList = (req, res) => {
  try {
  } catch (error) {
    console.log("admin.controller -> getUserList", error);
    return sendResponse(res, 500, false, "Something went wrong!", {
      message: error.message,
    });
  }
};

module.exports = { getUserList };
