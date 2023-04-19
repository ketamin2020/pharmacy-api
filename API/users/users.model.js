const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const userSchema = new Schema(
  {
    first_name: { type: String, required: false, default: "" },
    last_name: { type: String, required: false, default: "" },
    middle_name: { type: String, required: false, default: "" },
    about: { type: String, required: false, default: "" },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    avatar: { type: Object, required: false, default: {} },
    wishlist: { type: ObjectId, ref: "Wish", default: "" },
    reviews: { type: Array, required: false, default: [] },
    orders: { type: Array, required: false, default: [] },
    basket: { type: Array, required: false, default: [] },
    bonus: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
