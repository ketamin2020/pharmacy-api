const { Router } = require("express");
const authMiddleware = require("../middlewares/authorization.js");
const publicControllers = require("./drugs.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const drugsRouter = Router();

drugsRouter.get(
  "/admin-drugs-list",
  // asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(publicControllers.getDrugsList)
);
drugsRouter.get(
  "/medicines-group",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(publicControllers.getMedicinesGroupList)
);
drugsRouter.get(
  "/drug",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(publicControllers.getDrugById)
);
drugsRouter.get(
  "/search-address",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(publicControllers.searchByCityName)
);
drugsRouter.get(
  "/search-werehouse",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(publicControllers.searchByWerehouse)
);

module.exports = drugsRouter;
