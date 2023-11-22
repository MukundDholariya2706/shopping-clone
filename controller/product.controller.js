const path = require("path");
const { sendResponse, ObjectId } = require("../services/common.service");
const {
  saveProduct,
  findProduct,
  deleteProductService,
  updateProductService,
  listProductService,
} = require("../services/product.service");

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

    return sendResponse(res, 200, true, "Product update successfully!");
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
    ];

    const isProductExist = await findProduct(query);

    if (isProductExist.length == 0) {
      return sendResponse(res, 404, false, "Product not found", null);
    }

    await deleteProductService(productId);

    sendResponse(res, 200, true, "Product deleted succssfully", null);
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
      productImages = uploadedProductImages.map(
        (file) =>
          (file.imageUrl = `http://localhost:3000/product/image/${file.filename}`)
      );
    }

    const query = {
      _id: req.params.productId,
      ownerDetails: req.user._id,
    };

    const existingProduct = await findProduct([
      {
        $match: {
          _id: new ObjectId(req.params.productId),
          ownerDetails: new ObjectId(req.user._id),
        },
      },
    ]);

    productImages = [...productImages, ...existingProduct[0].productImages];

    const product = await updateProductService(query, {
      productImages: productImages,
    });

    return sendResponse(
      res,
      200,
      true,
      "Product Images upload successfully!",
      product
    );
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
  console.log(coverImageIsExist, "coverImageIsExist");
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
  getProductList,
  sendProductImage,
};
