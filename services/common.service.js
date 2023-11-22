const mongoose = require("mongoose");
const multer = require("multer");
const ObjectId = mongoose.Types.ObjectId;

const sendResponse = (res, statusCode, status, message, data) => {
  try {
    const response = {
      status,
      message,
    };

    if (statusCode == 500) {
      response.error = data.message;
    } else {
      response.data = data;
    }

    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.write(JSON.stringify(response));
    res.end();
  } catch (error) {
    console.log("common service -> sendResponse", error);
    throw error;
  }
};

// multer error handling
const uploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return sendResponse(
        res,
        400,
        false,
        "File size is too large. Maximum allowed size is 1 MB.",
        null
      );
    } else if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return sendResponse(res, 400, false, "Too many files uploaded.", null);
    } else if (error) {
      return sendResponse(res, 400, false, error.message, null);
    }
  }
  if (error.code == "FILE_FORMAT_NOT_MATCH") {
    return sendResponse(res, 400, false, error.message, null);
  }
  next(error);
};

module.exports = { sendResponse, ObjectId, uploadError };
