const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {
  addDefaultSuperAdminRole,
  addDefaultSellerRole,
  addDefaultUserRole,
  addDefalutSuperAdmin,
} = require("../scripts/defaultUser");

dotenv.config();

MONGODB_URI = process.env.DB_URL || 'mongodb+srv://mukunddtridhyatech:2ppUJEJD61nF7ZiX@shopping-clone-db.iiirlyy.mongodb.net/shopping_clone';

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", async () => {
  await addDefaultSuperAdminRole();
  await addDefaultSellerRole();
  await addDefaultUserRole();
  await addDefalutSuperAdmin();
  console.log("Database connected!");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongodb Connection failed! ", err);
  mongoose.disconnect();
});

module.exports = mongoose;
