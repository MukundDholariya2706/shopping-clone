const mongoose = require("mongoose");

let imageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
});

const Image = mongoose.model("image", imageSchema, "image");
module.exports = Image;
