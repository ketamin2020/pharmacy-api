const mongoose = require("mongoose");

const brandsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  logo: { type: Buffer, required: true },
});

const brandsModel = mongoose.model("Brands", brandsSchema);

module.exports = brandsModel;
