const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");
const imagesSchema = new Schema(
  {
    morion: { type: Number, required: true, unique: true },
    items: { type: Array, default: [] },
  },
  { timestamps: true }
);
imagesSchema.plugin(paginate);
imagesSchema.plugin(toJSON);
const imagesModel = mongoose.model("Images", imagesSchema);

module.exports = imagesModel;
