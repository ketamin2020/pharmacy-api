const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");
const substanceSchema = new Schema(
  {
    name_ua: { type: String, required: true, unique: true },
    name_eu: { type: String, required: true, unique: true },
    index: { type: String, required: true },
    head_title: { type: String, required: true, unique: true },
    slug: { type: String, slug: "name_ua" },
  },
  { timestamps: true }
);
substanceSchema.plugin(paginate);
substanceSchema.plugin(toJSON);

const substanceModel = mongoose.model("Substance", substanceSchema);

module.exports = substanceModel;
