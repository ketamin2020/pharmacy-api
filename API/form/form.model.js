const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const formSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const formModel = mongoose.model("Form", formSchema);

module.exports = formModel;
