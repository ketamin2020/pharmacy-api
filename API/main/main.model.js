const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const validator = require("validator");
mongoose.plugin(slug);
const { Schema } = mongoose;
const mainSchema = new Schema(
  {
    name: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    work_schedule: {
      start: { type: Number, default: 8 },
      end: { type: Number, default: 21 },
    },
    support_email: {
      type: String,
      default: "",
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false,
        require: false,
      },
    },
    address: { type: String, default: "" },
    marketing: {
      phone: { type: String, default: "" },
      email: {
        type: String,
        default: "",
        validate: {
          validator: validator.isEmail,
          message: "{VALUE} is not a valid email",
          isAsync: false,
          require: false,
        },
      },
    },
    provider: {
      phone: { type: String, default: "" },
      email: {
        type: String,
        default: "",
        validate: {
          validator: validator.isEmail,
          message: "{VALUE} is not a valid email",
          isAsync: false,
          require: false,
        },
      },
    },
    sales: {
      phone: { type: String, default: "" },
      email: {
        type: String,
        default: "",
        validate: {
          validator: validator.isEmail,
          message: "{VALUE} is not a valid email",
          isAsync: false,
          require: false,
        },
      },
    },
  },
  { timestamps: true }
);

const mainModel = mongoose.model("Main", mainSchema);

module.exports = mainModel;
