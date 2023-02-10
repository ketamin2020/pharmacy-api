const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../../helpers/error.helpers");

const authSchema = new Schema({
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // token: { type: String, default: "" },
  // projectIds: [{ type: ObjectId, ref: "Project" }],
  // verificationToken: String,
  // resetPasswordToken: String,
  phone: { type: String, required: true, unique: true, sparse: true },
  admin: { type: Boolean, required: true },
});

authSchema.statics.brcPassHash = brcPassHash;
authSchema.statics.userByEmail = userByEmail;
authSchema.methods.checkUser = checkUser;
authSchema.methods.updateToken = updateToken;
authSchema.statics.verifyToken = verifyToken;
authSchema.methods.addProject = addProject;
authSchema.methods.removeProjectId = removeProjectId;
authSchema.statics.removeProjectFromParticipants = removeProjectFromParticipants;
authSchema.methods.removeVerificationToken = removeVerificationToken;
authSchema.statics.findByVerificationToken = findByVerificationToken;
authSchema.statics.findByTokenAndUpdatePassword = findByTokenAndUpdatePassword;

function brcPassHash(password) {
  return bcrypt.hash(password, 3);
}

async function userByEmail(email) {
  return this.findOne({ email });
}

async function checkUser(password) {
  const isPassValid = await bcrypt.compare(password, this.password);

  if (!isPassValid) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  await this.updateToken(token);

  return token;
}

function updateToken(token) {
  return authModel.findByIdAndUpdate(this._id, {
    token,
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function addProject(projectId) {
  return authModel.findByIdAndUpdate(
    this._id,
    {
      $push: { projectIds: projectId },
    },
    { new: true }
  );
}

function removeProjectId(projectId) {
  this.update({
    $pull: { projectIds: { $in: projectId } },
  });
}
async function removeProjectFromParticipants(projectId) {
  return this.updateMany(
    { projectIds: projectId },
    { $pull: { projectIds: { $in: projectId } } }
  );
}

async function findByVerificationToken(verificationToken) {
  return this.findOne({ verificationToken });
}

async function removeVerificationToken() {
  return authModel.findByIdAndUpdate(this._id, {
    verificationToken: null,
  });
}
function findByTokenAndUpdatePassword(resetPasswordToken, newPassword) {
  const toUpdate = {
    resetPasswordToken: null,
    password: newPassword,
  };
  return this.findOneAndUpdate({ resetPasswordToken }, toUpdate);
}

const authModel = mongoose.model("Auth", authSchema);

module.exports = authModel;
