const Role = require("../models/role.model");

const findRole = async (query) => {
  try {
    return await Role.findOne(query);
  } catch (error) {
    console.log("role.service -> findRole", error);
    throw error;
  }
};

module.exports = { findRole };
