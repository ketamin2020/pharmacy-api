const jwt = require("jsonwebtoken");

const httpStatus = require("http-status");

const moment = require("moment");

const ApiError = require("../../utils/ApiError.js");
const userService = require("./user_service.js");
const Token = require("./token_model.js");
const { tokenTypes } = require("../../constants/token_types.js");

const generateToken = (
  userId,
  expires,
  type,
  secret = process.env.JWT_SECRET
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    "minutes"
  );
  const accessToken = generateToken(
    user.id.toString(),
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    process.env.JWT_REFRESH_EXPIRATION_DAYS,
    "days"
  );
  const refreshToken = generateToken(
    user.id.toString(),
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id.toString(),
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
  }
  const expires = moment().add(
    process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    "minutes"
  );
  const resetPasswordToken = generateToken(
    user.id.toString(),
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id.toString(),
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(
    process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    "minutes"
  );
  const verifyEmailToken = generateToken(
    user.id.toString(),
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  await saveToken(
    verifyEmailToken,
    user.id.toString(),
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  return verifyEmailToken;
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
