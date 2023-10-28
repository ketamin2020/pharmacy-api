const { Router } = require("express");

const QuantityControllers = require("./quantity.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const quantityRouter = Router();

quantityRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(QuantityControllers.getQuantity)
);
quantityRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(QuantityControllers.postQuantity)
);
quantityRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(QuantityControllers.putQuantity)
);
quantityRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(QuantityControllers.deleteQuantity)
);

module.exports = quantityRouter;
