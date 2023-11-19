const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");

const blogSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    active: { type: Boolean, required: false, default: true },
    entity: { type: Array, required: false, default: [] },
    preview: { type: Object, default: {} },
    type: { type: ObjectId, ref: "Blogcategory" },
    images: { type: Array, required: false, default: [] },
    section: [
      {
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],

    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);
blogSchema.plugin(paginate);
blogSchema.plugin(toJSON);
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
