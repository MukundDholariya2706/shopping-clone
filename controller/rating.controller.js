const { sendResponse, ObjectId } = require("../services/common.service");
const { listProductService } = require("../services/product.service");
const {
  ratingService,
  addReviceSerivce,
} = require("../services/rating.service");

const addRating = async (req, res) => {
  try {
    const data = {
      product: req.params.productId,
      user: req.user._id,
      rate: req.body.rate,
    };

    const isRatingExist = await ratingService([
      {
        $match: {
          product: new ObjectId(data.product),
          user: new ObjectId(data.user),
        },
      },
    ]);

    if(isRatingExist.length !== 0 ){
        return sendResponse(res, 404, false, "Rating already added!", null);
    }

    await addReviceSerivce(data);

    const ratingDataQuery = [
      {
        $match: {
          product: new ObjectId(data.product),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rate" },
          ratingCount: { $sum: 1 },
        },
      },
    ];

    const productListQuery = [
      {
        $match: {
          _id: new ObjectId(data.product),
        },
      },
      {
        $project: {
          __v: 0,
          ownerDetails: 0,
        },
      },
    ];

    const ratingListQuery = [
      {
        $match: {
          product: new ObjectId(data.product),
          user: new ObjectId(data.user),
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          rate: 1,
          user: {
            _id: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
          },
        },
      },
    ];

    const [ratingData, productList, ratingList] = await Promise.all([
      ratingService(ratingDataQuery),
      listProductService(productListQuery),
      ratingService(ratingListQuery),
    ]);

    const response = {
      ratingList: ratingList,
      productList: productList[0],
      averageRating: ratingData[0].averageRating,
      ratingCount: ratingData[0].ratingCount,
    };

    return sendResponse(res, 200, true, "Rating add successfully", response);
  } catch (error) {
    console.log("rating.service -> addRating", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

module.exports = { addRating };
