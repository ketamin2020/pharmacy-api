const { Router } = require("express");
const upload = require("../middlewares/upload");
const BrandsControllers = require("./brands.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const multerInstance = require("../common/multer");
const brandsRouter = Router();

brandsRouter.get("/get", asyncWrapper(BrandsControllers.getBrands));
brandsRouter.get("/get-list", asyncWrapper(BrandsControllers.getBrandsList));
brandsRouter.post("/create", asyncWrapper(BrandsControllers.postBrand));
brandsRouter.put("/update", asyncWrapper(BrandsControllers.putBrand));
brandsRouter.delete("/delete", asyncWrapper(BrandsControllers.deleteBrand));

module.exports = brandsRouter;
