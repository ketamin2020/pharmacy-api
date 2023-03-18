const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const imagesSchema = new Schema(
  {
    morion: { type: Number, required: true, unique: true },
    items: { type: Array, default: [] },
  },
  { timestamps: true }
);

const imagesModel = mongoose.model("Images", imagesSchema);

module.exports = imagesModel;
