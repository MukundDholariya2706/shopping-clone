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

const updateRatingService = async (ratingId, body) => {
  try {
    return await Rating.findByIdAndUpdate(ratingId, body);
  } catch (error) {
    console.log("rating.service -> updateRatingService", error);
    throw error;
  }
};

const deleteRatingService = async (ratingId) => {
  try {
    return await Rating.findByIdAndDelete(ratingId);
  } catch (error){
    console.log("rating.service -> deleteRatingService", error);
    throw error;
  }
};

module.exports = {
  addReviceSerivce,
  ratingService,
  updateRatingService,
  deleteRatingService,
};
