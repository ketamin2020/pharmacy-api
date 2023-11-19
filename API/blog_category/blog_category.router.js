const { Router } = require("express");

const CategoryControllers = require("./blog_category.controller.js");
const asyncWrapper = require("../../utils/asyncWrapper.js");
const authHiddleware = require("../middlewares/authorization.js");

const categoryRouter = Router();

categoryRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(CategoryControllers.getCategory)
);
categoryRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(CategoryControllers.postCategory)
);
categoryRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(CategoryControllers.putCategory)
);
categoryRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(CategoryControllers.deleteCategory)
);

module.exports = categoryRouter;
