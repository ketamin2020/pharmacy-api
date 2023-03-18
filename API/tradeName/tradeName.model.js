const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;

const tradeNameSchema = new Schema(
  {
    name: { type: String, required: true, default: "-" },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const tradeNameModel = mongoose.model("TradeName", tradeNameSchema);

module.exports = tradeNameModel;
