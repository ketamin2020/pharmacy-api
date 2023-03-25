const { Router } = require("express");

const PakcagesControllers = require("./package.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const packagesRouter = Router();

packagesRouter.get("/get", asyncWrapper(PakcagesControllers.getPeckages));
packagesRouter.post("/create", asyncWrapper(PakcagesControllers.postPeckage));
packagesRouter.put("/update", asyncWrapper(PakcagesControllers.putPeckage));
packagesRouter.delete(
  "/delete",
  asyncWrapper(PakcagesControllers.deletePeckage)
);

module.exports = packagesRouter;
