const path = require("path");
const fs = require("fs");

const unlinkImage = (fileName) => {
  try {
    const file = path.basename(fileName);
    fs.unlinkSync(`public/${file}`);
  } catch (error) {
    throw error;
  }
};

module.exports = { unlinkImage };
