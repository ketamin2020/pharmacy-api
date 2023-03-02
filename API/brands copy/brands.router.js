const { Router } = require("express");

const BrandsControllers = require("./brands.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const brandsRouter = Router();

brandsRouter.get("/get", asyncWrapper(BrandsControllers.getBrandsList));
brandsRouter.post("/create", asyncWrapper(BrandsControllers.postBrand));
brandsRouter.put("/update", asyncWrapper(BrandsControllers.putBrand));
brandsRouter.delete("/delete", asyncWrapper(BrandsControllers.deleteBrand));

module.exports = brandsRouter;
