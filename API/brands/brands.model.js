const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const brandsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    logo: {
      id: { type: String, require: true },
      url: { type: String, require: true },
    },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const brandsModel = mongoose.model("Brands", brandsSchema);

module.exports = brandsModel;
