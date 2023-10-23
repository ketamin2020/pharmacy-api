const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;

const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");

const bannerSchema = new Schema(
  {
    link: { type: String, default: "", require: true },
    id: { type: String, default: "", require: true },
    status: { type: Number, default: 1, require: false },
  },
  { timestamps: true }
);

bannerSchema.plugin(paginate);
bannerSchema.plugin(toJSON);

const bannerModel = mongoose.model("Banner", bannerSchema);

module.exports = bannerModel;
