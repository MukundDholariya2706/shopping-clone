const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {sendResponse} = require("../services/common.service");
const User = require("../models/user.model");
const ObjectId = mongoose.Types.ObjectId;

//  authenticate user
let authenticate = async (req, res, next) => {
  try {
    // Authorization header not found

    if (!req.header("Authorization")) {
      return sendResponse(res, 401, false, "Unauthorized, please login.", null);
    }

    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Token not found
    if (!token) {
      return sendResponse(
        res,
        401,
        false,
        "Authentication token not found",
        null
      );
    }

    const decoded = jwt.verify(token, process.env.API_SECRET);
    const user = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(decoded._id),
        },
      },
      {
        $lookup: {
          from: "role", // Name of the collection to join
          localField: "role", // User schema ref object name
          foreignField: "_id", // userType schema match with
          as: "role",
        },
      },
      {
        $unwind: "$role"
      }
    ]);

    req.user = user[0];
    next();
  } catch (error) {
    console.log("authenticate -> authenticate", error)
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = authenticate;
