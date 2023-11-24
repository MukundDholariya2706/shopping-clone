const Product = require("../models/product.model");
const User = require("../models/user.model");
const { sendResponse } = require("../services/common.service");
const {
  getAllUserList,
  deleteUserById,
  userIsExistSerivce,
} = require("../services/user.service");

// user list
const getUserList = async (req, res) => {
  try {
    let { sortBy, sortDirection, page = 1, limit = 10, search } = req.query;

    let sortObj = { createdAt: -1 };

    if (sortBy && sortDirection) {
      if (sortBy === "role") sortBy = "role.name";
      sortObj = { [sortBy]: Number(sortDirection) };
    }

    let filterObj = {
      "role.name": {
        $ne: "super admin",
      },
    };

    // Add search criteria to filterObj
    if (search) {
      filterObj.$or = [
        { first_name: { $regex: new RegExp(search, "i") } },
        { last_name: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
        // Add more fields for searching as needed
      ];
    }

    let skip = (page - 1) * limit;

    // userListing query
    const userListingQuery = [
      {
        $lookup: {
          from: "role",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $match: filterObj,
      },
      {
        $sort: sortObj,
      },
      {
        $limit: limit,
      },
      {
        $skip: skip,
      },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          email: 1,
          role: {
            _id: "$role._id",
            name: "$role.name",
          },
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
        },
      },
    ];

    //  total User count query
    const totalUserCountQuery = [
      {
        $lookup: {
          from: "role",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $match: filterObj,
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
        },
      },
    ];

    const [totalUserCount, userList] = await Promise.all([
      getAllUserList(totalUserCountQuery),
      getAllUserList(userListingQuery),
    ]);

    const response = {
      userList,
      pagination: {
        page,
        limit,
        total: totalUserCount.length > 0 ? totalUserCount[0].totalCount : 0,
      },
    };

    return sendResponse(res, 200, false, "List fetch successfully!", response);
  } catch (error) {
    console.log("admin.controller -> getUserList", error);
    return sendResponse(res, 500, false, "Something went wrong!", {
      message: error.message,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userIsExist = await userIsExistSerivce({ _id: userId });
    if (!userIsExist) {
      return sendResponse(res, 404, false, "User not found", null);
    }

    const deletedUser = await deleteUserById(userId);
    return sendResponse(
      res,
      200,
      true,
      "User delete successfully",
      deletedUser
    );
  } catch (error) {
    console.log("admin.controller -> deleteUser", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

const getStatistics = async (req, res) => {
  try {
    const [
      totalUser,
      totalSeller,
      totalProduct,
      totalActiveProduct,
      totalInactiveProduct,
    ] = await Promise.all([
      User.aggregate([
        {
          $lookup: {
            from: "role",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $match: {
            "role.name": {
              $eq: "user",
            },
          },
        },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
          },
        },
      ]),
      User.aggregate([
        {
          $lookup: {
            from: "role",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
        {
          $match: {
            "role.name": {
              $eq: "seller",
            },
          },
        },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
          },
        },
      ]),
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
          },
        },
      ]),
      Product.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
          },
        },
      ]),
      Product.aggregate([
        {
          $match: {
            isActive: false,
          },
        },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
          },
        },
      ]),
    ]);

    const data = {
      totalUser: totalUser.length > 0 ? totalUser[0].totalCount : 0,
      totalSeller: totalSeller.length > 0 ? totalSeller[0].totalCount : 0,
      totalProduct: totalProduct.length > 0 ? totalProduct[0].totalCount : 0,
      totalActiveProduct:
        totalActiveProduct.length > 0 ? totalActiveProduct[0].totalCount : 0,
      totalInactiveProduct:
        totalInactiveProduct.length > 0
          ? totalInactiveProduct[0].totalCount
          : 0,
    };

    return sendResponse(res, 200, true, "Statistics fetch succssfully!", data);
  } catch (error) {
    console.log("admin.controller -> getStatistics", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = { getUserList, deleteUser, getStatistics };
