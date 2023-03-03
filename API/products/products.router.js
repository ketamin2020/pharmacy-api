const { Router } = require("express");
const upload = require("../middlewares/upload");
const ProductsControllers = require("./products.conroller");
const asyncWrapper = require("../../utils/asyncWrapper");
const multerInstance = require("../common/multer");
const productsRouter = Router();

productsRouter.get("/get", asyncWrapper(ProductsControllers.getProducts));
productsRouter.post("/create", asyncWrapper(ProductsControllers.postProduct));
productsRouter.put("/update", asyncWrapper(ProductsControllers.putProduct));
productsRouter.delete(
  "/delete",
  asyncWrapper(ProductsControllers.deleteProduct)
);

module.exports = productsRouter;
