const path = require("path");
const fs = require("fs");
const multer = require("multer");

// multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var dir = "public";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    req.fileName = fileName;
    cb(null, fileName);
  },
});

// multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1, // 1MB
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      const error = new Error(
        `Only ${allowedExtensions.toString()} files are allowed.`
      );
      error.status = 400;
      error.code = "FILE_FORMAT_NOT_MATCH";
      return cb(error);
    }

    cb(undefined, true);
    // cb(undefined, false);
  },
});

// create dynamic function for multer config
const multerConfig = (fileSize, fileType) => {
  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * fileSize, // 1MB
    },
    fileFilter: (req, file, cb) => {
      const allowedExtensions = fileType;
      const fileExt = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.includes(fileExt)) {
        const error = new Error(
          `Only ${allowedExtensions.toString()} files are allowed.`
        );
        error.status = 400;
        error.code = "FILE_FORMAT_NOT_MATCH";
        return cb(error);
      }

      cb(undefined, true);
      // cb(undefined, false);
    },
  });

  return upload;
};

module.exports = { upload, multerConfig };
