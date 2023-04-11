const { Router } = require("express");

const { userLogin, userLogout } = require("../auth/auth.controller");

const asyncWrapper = require("../../utils/asyncWrapper");

const authRouter = Router();

authRouter.post("/login", asyncWrapper(userLogin));

authRouter.post("/logout", asyncWrapper(userLogout));

module.exports = authRouter;
