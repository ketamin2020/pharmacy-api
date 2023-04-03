const { Router } = require("express");

const priceControllers = require("./price.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const priceRouter = Router();

priceRouter.get("/get", asyncWrapper(priceControllers.getPrices));
priceRouter.post("/create", asyncWrapper(priceControllers.postPrice));
priceRouter.put("/update", asyncWrapper(priceControllers.updatePrice));
priceRouter.delete("/delete", asyncWrapper(priceControllers.deletePrice));

module.exports = priceRouter;
