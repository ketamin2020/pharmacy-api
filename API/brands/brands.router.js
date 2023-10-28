const { Router } = require("express");
const upload = require("../middlewares/upload");
const BrandsControllers = require("./brands.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const multerInstance = require("../common/multer");
const authHiddleware = require("../middlewares/authorization.js");
const brandsRouter = Router();

brandsRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BrandsControllers.getBrands)
);
brandsRouter.get(
  "/get-list",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BrandsControllers.getBrandsList)
);
brandsRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BrandsControllers.postBrand)
);
brandsRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BrandsControllers.putBrand)
);
brandsRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(BrandsControllers.deleteBrand)
);

module.exports = brandsRouter;
