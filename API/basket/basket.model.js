const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const basketSchema = new Schema(
  {
    user_id: { type: ObjectId, required: true, unique: true },
    products: [{ type: ObjectId, ref: "Properties" }],
  },
  { timestamps: true }
);

const basketModel = mongoose.model("Basket", basketSchema);

module.exports = basketModel;
