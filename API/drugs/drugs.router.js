const { Router } = require("express");

const publicControllers = require("./drugs.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const drugsRouter = Router();

drugsRouter.get(
  "/admin-drugs-list",
  asyncWrapper(publicControllers.getDrugsList)
);
drugsRouter.get(
  "/medicines-group",
  asyncWrapper(publicControllers.getMedicinesGroupList)
);
drugsRouter.get("/drug", asyncWrapper(publicControllers.getDrugById));
drugsRouter.get(
  "/search-address",
  asyncWrapper(publicControllers.searchByCityName)
);
drugsRouter.get(
  "/search-werehouse",
  asyncWrapper(publicControllers.searchByWerehouse)
);

module.exports = drugsRouter;
