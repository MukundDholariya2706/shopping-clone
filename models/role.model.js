const mongoose = require("mongoose");

let roleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Role = mongoose.model("role", roleSchema, "role");

module.exports = Role;
