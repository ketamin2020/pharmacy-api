const userModel = require("../../API/users/users.model");
const {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require("../../helpers/error.helpers");
const uuid = require("uuid");
const httpStatus = require("http-status");

const {
  sendEmailVerification,
  sendResetPasswordLink,
} = require("../../utils/emailSender");

async function registration(req, res) {
  const { phone } = req.body;
  const existingUser = await userModel.findOne({ phone });

  const verificationCode = uuid.v4();
  if (existingUser) {
    const toUpdate = { verificationCode };
    await userModel.findByIdAndUpdate({ _id: existingUser._id }, toUpdate);
    return res.status(201).json({
      verificationCode,
      message: httpStatus.CREATED,
    });
  }
  // if (existingUser) {
  //   throw new ConflictError("This email is already used");
  // }

  // const passwordHash = await userModel.brcPassHash(password);
  // const verificationToken = uuid.v4();

  const user = new userModel({
    phone: req.body.phone,
    verificationCode: verificationCode,
  });

  await user.save();

  // await sendEmailVerification(user.email, user.verificationToken);

  return res.status(201).json({
    verificationCode,
    message: httpStatus.CREATED,
  });
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  const user = await userModel.userByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Wrong credentials");
  }

  if (user.verificationToken !== null) {
    throw new UnauthorizedError("Email is not verified!");
  }

  const token = await user.checkUser(password);

  return res.status(200).json({
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  });
}

async function userLogout(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ message: "Not found" });
  }
  const userToBeLoguot = await user.updateToken("");
  if (!userToBeLoguot) {
    return res.status(400).json({ message: "Not found" });
  }

  return res.status(204).end();
}

async function verifyEmail(req, res) {
  const { verificationToken } = req.params;

  const verifiedUser = await userModel.findByVerificationToken(
    verificationToken
  );

  if (!verifiedUser) {
    throw new NotFoundError("User not found");
  }

  await verifiedUser.removeVerificationToken();

  return res.status(204).end();
}
async function resetPasswordRequest(req, res, next) {
  const { email } = req.body;
  const user = await userModel.userByEmail(email);
  if (!user) {
    throw new NotFoundError("User with such email doesn`t exist");
  }
  const resetPasswordToken = uuid.v4();
  user.resetPasswordToken = resetPasswordToken;
  await user.save();
  await sendResetPasswordLink(user.email, resetPasswordToken);
  res.status(200).end();
}
async function resetPassword(req, res, next) {
  const { resetPasswordToken } = req.params;
  const { password } = req.body;
  const passwordHash = await userModel.brcPassHash(password);
  const user = await userModel.findByTokenAndUpdatePassword(
    resetPasswordToken,
    passwordHash
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.status(204).end();
}

module.exports = {
  registration,
  userLogin,
  userLogout,
  verifyEmail,
  resetPasswordRequest,
  resetPassword,
};
