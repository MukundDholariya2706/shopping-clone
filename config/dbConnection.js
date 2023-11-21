const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

MONGODB_URI = process.env.DB_URL;

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", async () => {
  console.log("Database connected!");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongodb Connection failed! ", err);
  mongoose.disconnect();
});

module.exports = mongoose;
