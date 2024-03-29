const { Router } = require("express");

const bannerControllers = require("./banner.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const bannerRouter = Router();

bannerRouter.get(
  "/get",

  asyncWrapper(bannerControllers.getBanners)
);
bannerRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(bannerControllers.postBanner)
);
bannerRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(bannerControllers.deleteBanner)
);

module.exports = bannerRouter;
