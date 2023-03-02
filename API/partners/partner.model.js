const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const partnerSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    full_address: { type: String, required: true, unique: true },
    common_phone: { type: String, required: true },
    common_email: { type: String, required: true },
    ordering_email: { type: String, required: true },
    ordering_phone: { type: String, required: true },
    business_hours: {
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
    },
    slug: { type: String, slug: "name" },
  },
  { timestamps: true }
);

const partnerModel = mongoose.model("Partners", partnerSchema);

module.exports = partnerModel;
