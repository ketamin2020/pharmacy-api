const { Router } = require("express");

const tradeNameControllers = require("./tradeName.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const tradeNameRouter = Router();

tradeNameRouter.get("/get", asyncWrapper(tradeNameControllers.getTradeNames));
tradeNameRouter.post(
  "/create",
  asyncWrapper(tradeNameControllers.postTradeName)
);
tradeNameRouter.put("/update", asyncWrapper(tradeNameControllers.putTradeName));
tradeNameRouter.delete(
  "/delete",
  asyncWrapper(tradeNameControllers.deleteTradeName)
);

module.exports = tradeNameRouter;
