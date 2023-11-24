const { sendResponse } = require("../services/common.service");

// check user have access
const validateRole = (userRoles) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // check request user role
      if (!userRoles.includes(user.role.name)) {
        return sendResponse(
          res,
          403,
          false,
          "Unauthorized: You do not have permission to access this resource",
          null
        );
      }

      next();
    } catch (error) {
      console.error("Error in validateRole middleware:", error);
      return sendResponse(res, 500, false, "Something went worng!", {
        message: error.message,
      });
    }
  };
};

module.exports = validateRole;
