const { Router } = require("express");

const bannerControllers = require("./banner.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const bannerRouter = Router();

bannerRouter.get("/get", asyncWrapper(bannerControllers.getBanners));
bannerRouter.post("/create", asyncWrapper(bannerControllers.postBanner));
bannerRouter.delete("/delete", asyncWrapper(bannerControllers.deleteBanner));

module.exports = bannerRouter;
