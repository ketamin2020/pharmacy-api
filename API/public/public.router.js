const { Router } = require("express");

const publicControllers = require("./public.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const publicRouter = Router();

publicRouter.get("/drugs-list", asyncWrapper(publicControllers.getDrugsList));

module.exports = publicRouter;
