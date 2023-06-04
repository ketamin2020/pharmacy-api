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
    products: [
      {
        product: { type: ObjectId, ref: "Properties" },
        qty: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const basketModel = mongoose.model("Basket", basketSchema);

module.exports = basketModel;
