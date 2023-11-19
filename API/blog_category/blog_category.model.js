const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const { toJSON } = require("../../plugin/toJSON");
mongoose.plugin(slug);

const { Schema } = mongoose;

const blogCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: false },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

blogCategorySchema.plugin(toJSON);

const blogCategoryModel = mongoose.model("Blogcategory", blogCategorySchema);

module.exports = blogCategoryModel;
