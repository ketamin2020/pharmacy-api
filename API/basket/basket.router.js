const { Router } = require("express");
const authMiddleware = require("../middlewares/authorization");
const basketControllers = require("./basket.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const basketRouter = Router();

basketRouter.get(
  "/basket",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(basketControllers.getBasketList)
);
basketRouter.get(
  "/user-basket",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(basketControllers.getBasketListByUser)
);
basketRouter.post(
  "/basket-create",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(basketControllers.postBasket)
);
basketRouter.put(
  "/basket-update",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(basketControllers.putBasket)
);
basketRouter.delete(
  "/basket-delete",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(basketControllers.deleteBasket)
);
basketRouter.put(
  "/qty",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(basketControllers.changeQty)
);

module.exports = basketRouter;
