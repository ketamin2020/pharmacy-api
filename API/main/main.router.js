const { Router } = require("express");

const ImagesControllers = require("./images.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const imagesRouter = Router();

imagesRouter.get("/get", asyncWrapper(ImagesControllers.getImages));
imagesRouter.post("/create", asyncWrapper(ImagesControllers.postImages));
imagesRouter.put("/update", asyncWrapper(ImagesControllers.putImages));
imagesRouter.delete("/delete", asyncWrapper(ImagesControllers.deleteImages));

module.exports = imagesRouter;
