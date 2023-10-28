const { Router } = require("express");

const PropertiesControllers = require("./properties.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const propertyRouter = Router();

propertyRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PropertiesControllers.getProperties)
);
propertyRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PropertiesControllers.postProperty)
);
propertyRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PropertiesControllers.putProperty)
);
propertyRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PropertiesControllers.deleteProperty)
);

module.exports = propertyRouter;
