const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const authSchema = new Schema({
  login: { type: String, required: false, unique: true },
  password: { type: String, required: false, unique: true },
  phone: { type: String, required: true, unique: true, sparse: true },
  admin: { type: Boolean, required: true, default: false },
  user: { type: ObjectId, ref: "Users" },
});

const authModel = mongoose.model("Auth", authSchema);

module.exports = authModel;
