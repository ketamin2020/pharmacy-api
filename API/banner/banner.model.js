const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const bannerSchema = new Schema(
  {
    link: { type: String, default: "", require: true },
    id: { type: String, default: "", require: true },
  },
  { timestamps: true }
);

const bannerModel = mongoose.model("Banner", bannerSchema);

module.exports = bannerModel;