const { Router } = require("express");

const QuantityControllers = require("./quantity.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const quantityRouter = Router();

quantityRouter.get("/get", asyncWrapper(QuantityControllers.getQuantity));
quantityRouter.post("/create", asyncWrapper(QuantityControllers.postQuantity));
quantityRouter.put("/update", asyncWrapper(QuantityControllers.putQuantity));
quantityRouter.delete(
  "/delete",
  asyncWrapper(QuantityControllers.deleteQuantity)
);

module.exports = quantityRouter;
