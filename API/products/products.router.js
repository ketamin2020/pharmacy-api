const { Router } = require("express");
const upload = require("../middlewares/upload");
const ProductsControllers = require("./products.conroller");
const asyncWrapper = require("../../utils/asyncWrapper");
const multerInstance = require("../common/multer");
const authHiddleware = require("../middlewares/authorization.js");
const productsRouter = Router();

productsRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ProductsControllers.getProducts)
);
productsRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ProductsControllers.postProduct)
);
productsRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ProductsControllers.putProduct)
);
productsRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(ProductsControllers.deleteProduct)
);

module.exports = productsRouter;
