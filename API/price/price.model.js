const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");

const priceSchema = new Schema(
  {
    code: { type: String, required: false },
    slug: { type: String, slug: "name" },
    current: { type: Number, required: true },
    previous_price: { type: Number, required: false },
    morion: { type: Number, required: true },
    partner: { type: ObjectId, ref: "Partners" },
  },
  { timestamps: true }
);
priceSchema.plugin(paginate);
priceSchema.plugin(toJSON);

const priceModel = mongoose.model("Price", priceSchema);

module.exports = priceModel;
