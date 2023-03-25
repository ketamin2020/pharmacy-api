const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const quantitySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const quantityModel = mongoose.model("Quantity", quantitySchema);

module.exports = quantityModel;
