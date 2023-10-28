const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;

const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");

const workerSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    full_address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: String, required: true },
    slug: { type: String, slug: ["first_name", "last_name"] },
  },
  { timestamps: true }
);

workerSchema.plugin(paginate);
workerSchema.plugin(toJSON);

const workerModel = mongoose.model("Workers", workerSchema);

module.exports = workerModel;
