const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const dosageSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const dosageModel = mongoose.model("Dosage", dosageSchema);

module.exports = dosageModel;
