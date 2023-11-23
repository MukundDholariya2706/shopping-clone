const path = require("path");
const { sendResponse, ObjectId } = require("../services/common.service");
const {
  saveProduct,
  findProduct,
  deleteProductService,
  updateProductService,
  listProductService,
} = require("../services/product.service");
const {
  saveImageService,
  deleteImageService,
  findImageService,
} = require("../services/image.service");
const { unlinkImage } = require("../utils/utils");

// list all product
const getProductList = async (req, res) => {
  try {
    let { page = 1, limit = 10, min, max, gender, size, search } = req.query;
    let skip = (page - 1) * limit;

    const user = req.user;
    let filterObj = {};

    if (user.role.name == "seller") {
      filterObj = {
        ownerDetails: new ObjectId(user._id),
      };
    }

    // only show active product
    if (user.role.name == "user") {
      filterObj = {
        isActive: true,
      };
    }

    // size filter
    if (size) {
      filterObj.size = { $in: size.split(",") };
    }

    // price range filter
    if (min !== undefined || max !== undefined) {
      filterObj.price = {};
      if (min != undefined) {
        filterObj.price.$gte = parseInt(min, 10);
      }
      if (max !== undefined) {
        filterObj.price.$lte = parseInt(max, 10);
      }
    }

    // filter by gender
    if (gender) {
      filterObj.gender = gender;
    }

    // product by search
    if (search) {
      filterObj.$or = [
        {
          productName: { $regex: new RegExp(search, "i") },
        },
      ];
    }

    // search query
    const query = [
      {
        $match: filterObj,
      },
      {
        $limit: limit,
      },
      {
        $skip: skip,
      },
      {
        $lookup: {
          from: "image",
          localField: "productImages",
          foreignField: "_id",
          as: "productImages",
        },
      },
      {
        $project: {
          productName: 1,
          productDescription: 1,
          price: 1,
          size: 1,
          gender: 1,
          isActive: 1,
          ownerDetails: 1,
          productImages: {
            _id: 1,
            url: 1,
          },
        },
      },
    ];

    // total product count query
    const totalProductCountQuery = [
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

    //
    const [totalProductCount, productList] = await Promise.all([
      listProductService(totalProductCountQuery),
      listProductService(query),
    ]);

    const response = {
      productList,
      pagination: {
        page,
        limit,
        total:
          totalProductCount.length > 0 ? totalProductCount[0].totalCount : 0,
      },
    };

    return sendResponse(
      res,
      200,
      true,
      "Product List fetch successfully!",
      response
    );
  } catch (error) {
    console.log("product.controller -> getProductList", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// add new product
const addProduct = async (req, res) => {
  try {
    const reqBody = req.body;

    reqBody.ownerDetails = req.user._id;
    const product = await saveProduct(reqBody);

    return sendResponse(res, 200, true, "Product Add Successfully!!", product);
  } catch (error) {
    console.log("product.controller -> addProduct", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// update Product
const updateProduct = async (req, res) => {
  try {
    const reqBody = req.body;

    const query = [
      {
        $match: {
          _id: new ObjectId(req.params.productId),
          ownerDetails: new ObjectId(req.user._id),
        },
      },
    ];

    const productExist = await findProduct(query);
    if (productExist.length === 0) {
      return sendResponse(res, 404, false, "Product not found", null);
    }

    const updatedProduct = await updateProductService(
      {
        _id: req.params.productId,
        ownerDetails: req.user._id,
      },
      reqBody
    );

    return sendResponse(
      res,
      200,
      true,
      "Product update successfully!",
      updatedProduct
    );
  } catch (error) {
    console.log("product.controller -> updateProduct", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // find product by id and ownerDetails id
    const query = [
      {
        $match: {
          _id: new ObjectId(productId),
          ownerDetails: new ObjectId(req.user._id),
        },
      },
      {
        $lookup: {
          from: "image", // schema (model) name
          localField: "productImages", // local field in current schema
          foreignField: "_id",
          as: "productImages", // save as
        },
      },
    ];

    const productExist = await findProduct(query);

    if (productExist.length === 0) {
      return sendResponse(res, 404, false, "Product not found", null);
    }

    // Delete the product and its associated image (if any)
    await deleteProductService(productId);

    if (productExist[0].productImages != 0) {
      await deleteImageService({ _id: productExist[0].productImages });

      productExist[0].productImages.map((imagePath) => {
        unlinkImage(imagePath.url);
      });
    }

    return sendResponse(res, 200, true, "Product deleted succssfully", null);
  } catch (error) {
    console.log("product.controller -> deleteProduct", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// upload product images
const uploadImages = async (req, res) => {
  try {
    const uploadedProductImages = req.files || [];
    let productImages = [];

    if (uploadedProductImages != 0) {
      productImages = uploadedProductImages.map((file) => ({
        url: `http://localhost:3000/product/image/${file.filename}`,
      }));

      const newImageIds = await saveImageService(productImages);
      const existingProduct = await findProduct([
        {
          $match: {
            _id: new ObjectId(req.params.productId),
            ownerDetails: new ObjectId(req.user._id),
          },
        },
        {
          $lookup: {
            from: "image", // schema (model) name
            localField: "productImages", // local field in current schema
            foreignField: "_id",
            as: "productImages", // save as
          },
        },
        {
          $set: {
            productImages: {
              $concatArrays: ["$productImages", newImageIds],
            },
          },
        },
        {
          $project: {
            productName: 1,
            productDescription: 1,
            price: 1,
            size: 1,
            gender: 1,
            isActive: 1,
            ownerDetails: 1,
            productImages: {
              _id: 1,
              url: 1,
            },
          },
        },
      ]);

      // Update the product in the database with the new image information
      await updateProductService(
        {
          _id: req.params.productId,
          ownerDetails: req.user._id,
        },
        {
          productImages: existingProduct[0].productImages,
        }
      );

      return sendResponse(
        res,
        200,
        true,
        "Product Images upload successfully!",
        existingProduct
      );
    }
  } catch (error) {
    console.log("product.controller -> uploadImages", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// send product image
const sendProductImage = async (req, res) => {
  const filePath = path.join(__dirname, "..");
  res.sendFile(filePath + "/public/" + req.params.fileName);
};

// delete product image
const deleteProductImage = async (req, res) => {
  try {
    const imageQuery = [
      {
        $match: {
          _id: new ObjectId(req.params.imageId),
        },
      },
    ];

    const productQuery = [
      {
        $match: {
          _id: new ObjectId(req.params.productId),
        },
      },
    ];

    const [isProductExsits, isProductImageExists] = await Promise.all([
      findProduct(productQuery),
      findImageService(imageQuery),
    ]);

    console.log(isProductImageExists, "isProductImageExists");

    if (isProductExsits.length === 0) {
      return sendResponse(res, 404, false, "Product not found", null);
    }

    if (isProductImageExists.length === 0) {
      return sendResponse(res, 404, false, "Product image not found", null);
    }

    await deleteImageService({_id: isProductImageExists[0]});
    isProductImageExists.map((imagePath) => {
      unlinkImage(imagePath.url);
    });

    return sendResponse(
      res,
      200,
      true,
      "Product images delete successfully!",
      null
    );
  } catch (error) {
    console.log("product.controller -> deleteProductImage", error);
    return sendResponse(res, 500, false, "Something went worng!", {
      message: error.message,
    });
  }
};

// setup cover image
const setupCoverImage = async (productId, ownerId) => {
  // find product by id and ownerDetails id
  const query = [
    {
      $match: {
        _id: new ObjectId(productId),
        ownerDetails: new ObjectId(ownerId),
      },
    },
  ];

  // check cover image is set or not
  const coverImageIsExist = await findProduct(query);
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
  getProductList,
  sendProductImage,
  deleteProductImage,
};
