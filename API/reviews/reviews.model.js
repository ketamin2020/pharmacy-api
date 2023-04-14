const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const reviewSchema = new Schema(
  {
    author: { type: ObjectId, ref: "Users" },
    morion: { type: Number },
    property: { type: ObjectId, ref: "Properties" },
    text: { type: String, default: "" },
    rate: { type: String, default: "5" },
    anonim: { type: Boolean, default: false },
    sourse: { type: String, default: "site" },
    status: { type: Boolean, default: false },
    email: { type: String, default: "" },
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
    comments: { type: Array, default: [] },
    bought: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
