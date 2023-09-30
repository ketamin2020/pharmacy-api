const { Router } = require("express");

const validate = require("../../midelwares/validate.js");
const validation = require("../../validation/auth_validation.js");
const asyncWrapper = require("../../utils/asyncWrapper.js");
const { login, logout, refreshTokens } = require("./auth_controller.js");

const auth_router = Router();

auth_router.post(
  "/admin-login",
  validate(validation.login),
  asyncWrapper(login)
);
auth_router.post(
  "/admin-logout",
  validate(validation.logout),
  asyncWrapper(logout)
);
auth_router.post(
  "/admin-refresh",
  validate(validation.refreshTokens),
  asyncWrapper(refreshTokens)
);

module.exports = auth_router;
