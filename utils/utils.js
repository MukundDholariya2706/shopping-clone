const path = require("path");
const fs = require("fs");

const unlinkImage = (fileName) => {
  try {
    const filePath = path.join(__dirname, "..");
    const file = path.basename(fileName);

    if (fs.existsSync(filePath + "/public/" + file)) {
      fs.unlinkSync(`public/${file}`);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { unlinkImage };
