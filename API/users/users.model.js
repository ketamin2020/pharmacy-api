const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const usersSchema = new Schema({
  login: { type: String, required: false, unique: true },
  password: { type: String, required: false, unique: true },
  phone: { type: String, required: true, unique: true, sparse: true },
  admin: { type: Boolean, required: true, default: false },
});

const usersModel = mongoose.model("Users", usersSchema);

module.exports = usersModel;
