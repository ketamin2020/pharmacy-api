const { Router } = require("express");

const tradeNameControllers = require("./tradeName.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const tradeNameRouter = Router();

tradeNameRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(tradeNameControllers.getTradeNames)
);
tradeNameRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(tradeNameControllers.postTradeName)
);
tradeNameRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(tradeNameControllers.putTradeName)
);
tradeNameRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(tradeNameControllers.deleteTradeName)
);

module.exports = tradeNameRouter;
