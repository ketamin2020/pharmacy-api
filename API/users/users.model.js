const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const usersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true, sparse: true },
  admin: { type: Boolean, required: true },
});

const usersModel = mongoose.model("Auth", usersSchema);

module.exports = usersModel;
