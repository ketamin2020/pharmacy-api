const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const workerSchema = new Schema(
  {
    first_name: { type: String, required: true, unique: true },
    last_name: { type: String, required: true, unique: true },
    full_address: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    slug: { type: String, slug: ["first_name", "last_name"] },
  },
  { timestamps: true }
);

const workerModel = mongoose.model("Workers", workerSchema);

module.exports = workerModel;
