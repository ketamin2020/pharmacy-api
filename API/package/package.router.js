const { Router } = require("express");

const PakcagesControllers = require("./package.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const packagesRouter = Router();

packagesRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PakcagesControllers.getPeckages)
);
packagesRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PakcagesControllers.postPeckage)
);
packagesRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PakcagesControllers.putPeckage)
);
packagesRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PakcagesControllers.deletePeckage)
);

module.exports = packagesRouter;
