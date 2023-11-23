const Image = require("../models/image.model");

const saveImageService = async (data) => {
  try {
    return await Image.create(data);
  } catch (error) {
    console.log("image.service -> saveImageService", error);
    throw error;
  }
};

const deleteImageService = async (data) => {
  try {
    return await Image.deleteMany(data);
  } catch (error) {
    console.log("image.service -> deleteImageService", error);
    throw error;
  }
};

const findImageService = async (query) => {
  try {
    return await Image.aggregate(query);
  } catch (error) {
    console.log("image.service -> findImageSerivce", error);
    throw error;
  }
}

module.exports = { saveImageService, deleteImageService, findImageService };
