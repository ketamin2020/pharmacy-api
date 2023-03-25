const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const admnistrationRouteSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const administrationRouteModel = mongoose.model(
  "AdministrationRoute",
  admnistrationRouteSchema
);

module.exports = administrationRouteModel;
