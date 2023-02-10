const { Router } = require("express");
const authorization = require("../middlewares/authorization");
const { userLogin, userLogout } = require("../auth/auth.controller");

const { loginSchema } = require("./auth.validators");

const validator = require("../../helpers/joi.validation.handler");

const asyncWrapper = require("../../utils/asyncWrapper");

const authRouter = Router();

authRouter.post("/login", validator(loginSchema), asyncWrapper(userLogin));

authRouter.post("/logout", authorization, asyncWrapper(userLogout));

module.exports = authRouter;
