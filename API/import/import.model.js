const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);
const { Schema } = mongoose;
const importSchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    user_id: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

const importModel = mongoose.model("Import", importSchema);

module.exports = importModel;
