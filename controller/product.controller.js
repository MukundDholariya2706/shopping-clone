const { sendResponse, ObjectId } = require("../services/common.service");
const {
  saveProduct,
  findProduct,
  deleteProductService,
  updateProductService,
} = require("../services/product.service");

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
    const uploadedProductImages = req.files;
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

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  uploadImages,
};
