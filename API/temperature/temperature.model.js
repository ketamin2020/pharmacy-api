const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const temperatureSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const temperatureModel = mongoose.model("Temperature", temperatureSchema);

module.exports = temperatureModel;
