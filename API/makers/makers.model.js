const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;

const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");

const makersSchema = new Schema(
  {
    full_name: { type: String, required: true },
    short_name: { type: String, required: true },
    country: { type: String, required: true },
    factory: { type: String, required: true },
    slug: { type: String, slug: "full_name" },
    logo: {
      url: { type: String, required: true },
      slug: { type: String, slug: "full_name" },
    },
  },
  { timestamps: true }
);

makersSchema.plugin(paginate);
makersSchema.plugin(toJSON);

const makersModel = mongoose.model("Makers", makersSchema);

module.exports = makersModel;
