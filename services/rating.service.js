const Rating = require("../models/rating.model");

const addReviceSerivce = async (data) => {
  try {
    return await Rating.create(data);
  } catch (error) {
    console.log("rating.service -> addReviceSerivce", error);
    throw error;
  }
};

const ratingService = async (query) => {
  try {
    return await Rating.aggregate(query);
  } catch (error) {
    console.log("rating.service -> addReviceSerivce", error);
    throw error;
  }
};

module.exports = { addReviceSerivce, ratingService };
