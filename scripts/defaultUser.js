const bcrypt = require("bcryptjs");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const { saveUserService } = require("../services/user.service");

const addDefaultSuperAdminRole = async () => {
  let isSuperAdminRoleExist = await Role.findOne({
    name: "super admin",
  }).lean();

  if (isSuperAdminRoleExist) {
    console.log("Role (Super Admin) already exists!");
  } else {
    await Role.create({
      name: "super admin",
      isActive: true,
    });
    console.log("Role (Super Admin) created successfully...!");
  }
};

const addDefaultSellerRole = async () => {
  let isSuperAdminRoleExist = await Role.findOne({
    name: "seller",
  }).lean();

  if (isSuperAdminRoleExist) {
    console.log("Role (Seller) already exists!");
  } else {
    await Role.create({
      name: "seller",
      isActive: true,
    });
    console.log("Role (Seller) created successfully...!");
  }
};

const addDefaultUserRole = async () => {
  let isSuperAdminRoleExist = await Role.findOne({
    name: "user",
  }).lean();

  if (isSuperAdminRoleExist) {
    console.log("Role (User) already exists!");
  } else {
    await Role.create({
      name: "user",
      isActive: true,
    });
    console.log("Role (User) created successfully...!");
  }
};

const addDefalutSuperAdmin = async () => {
  let superAdminRole = await Role.findOne({
    name: "super admin",
  });

  let superAdminExist = await User.findOne({
    role: superAdminRole._id,
  });

  if (superAdminExist) {
    console.log("Super Admin already exists!");
  } else {
    let password = "Test@1234";
    let email = "admin@yopmail.com";
    let role = superAdminRole._id;

    let superAdminData = {
      first_name: "admin",
      last_name: "admin",
      email,
      password: await bcrypt.hash(password, 10),
      role: role,
      profileImage: ''
    };

    await saveUserService(superAdminData);
    console.log("Super admin created successfully...!");
  }
};

module.exports = {
  addDefaultSuperAdminRole,
  addDefaultSellerRole,
  addDefaultUserRole,
  addDefalutSuperAdmin,
};
