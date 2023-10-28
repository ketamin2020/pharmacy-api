const { Router } = require("express");

const priceControllers = require("./price.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const priceRouter = Router();

priceRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(priceControllers.getPrices)
);
priceRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(priceControllers.postPrice)
);
priceRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(priceControllers.updatePrice)
);
priceRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(priceControllers.deletePrice)
);

module.exports = priceRouter;
