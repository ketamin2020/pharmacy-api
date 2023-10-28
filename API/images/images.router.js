const { Router } = require("express");

const ImagesControllers = require("./images.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const imagesRouter = Router();

imagesRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ImagesControllers.getImages)
);
imagesRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ImagesControllers.postImages)
);
imagesRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ImagesControllers.putImages)
);
imagesRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ImagesControllers.deleteImages)
);

module.exports = imagesRouter;
