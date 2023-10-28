const { Router } = require("express");

const MakerControllers = require("./makers.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const makerRouter = Router();

makerRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(MakerControllers.getMakers)
);
makerRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(MakerControllers.postMaker)
);
makerRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(MakerControllers.putMaker)
);
makerRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(MakerControllers.deleteMaker)
);

module.exports = makerRouter;
