const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const groupsSchema = new Schema(
  {
    group_name: { type: String, required: true },
    slug: { type: String, slug: "group_name" },
    children: { type: Array, default: [] },
    group_image: { type: String, required: true },
  },
  { timestamps: true }
);

const groupsModel = mongoose.model("Groups", groupsSchema);

module.exports = groupsModel;
