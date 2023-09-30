const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { paginate } = require("../../plugin/paginate");
const { toJSON } = require("../../plugin/toJSON");

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    title: { type: String, required: false, default: "" },
    phone: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    status: { type: Number, required: false, default: 1 },
    address: { type: String, default: "", required: false },
    position: { type: String, default: "", required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.brcPassHash = async function (password) {
  return bcrypt.hash(password, 3);
};

userSchema.statics.verifyToken = async function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.plugin(paginate);
userSchema.plugin(toJSON);

module.exports = mongoose.model("AdminUser", userSchema);
