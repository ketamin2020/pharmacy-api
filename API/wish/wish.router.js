const { Router } = require("express");
const authMiddleware = require("../middlewares/authorization");
const wishControllers = require("./wish.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const wishRouter = Router();

wishRouter.get(
  "/wishlist",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(wishControllers.getWishList)
);
wishRouter.post(
  "/wishlist-create",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(wishControllers.postWish)
);
wishRouter.put(
  "/wishlist-update",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(wishControllers.putWish)
);
wishRouter.delete(
  "/wishlist-delete",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(wishControllers.deleteWish)
);

module.exports = wishRouter;
