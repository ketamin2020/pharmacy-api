const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const wishSchema = new Schema(
  {
    user_id: { type: ObjectId, required: true, unique: true },
    products: [{ type: ObjectId, ref: "Properties" }],
  },
  { timestamps: true }
);

const wishModel = mongoose.model("Wish", wishSchema);

module.exports = wishModel;
