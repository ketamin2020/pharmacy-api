const { Router } = require("express");

const publicControllers = require("./public.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const publicRouter = Router();

publicRouter.get("/drugs-list", asyncWrapper(publicControllers.getDrugsList));
publicRouter.get(
  "/medicines-group",
  asyncWrapper(publicControllers.getMedicinesGroupList)
);
publicRouter.get("/drug", asyncWrapper(publicControllers.getDrugById));
publicRouter.get(
  "/search-address",
  asyncWrapper(publicControllers.searchByCityName)
);
publicRouter.get(
  "/search-werehouse",
  asyncWrapper(publicControllers.searchByWerehouse)
);

module.exports = publicRouter;
