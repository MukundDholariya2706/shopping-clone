const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    auth_token: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  let user = this;
  let token = jwt.sign(
    {
      _id: user._id.toString(),
      role: user.role,
    },
    process.env.API_SECRET,
    {
      expiresIn: "1d",
    }
  );

  user.auth_token = token;
  await user.save();
  return token;
};

const User = mongoose.model("user", userSchema, "user");

module.exports = User;
