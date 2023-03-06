const { Router } = require("express");

const PropertiesControllers = require("./properties.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const propertyRouter = Router();

propertyRouter.get("/get", asyncWrapper(PropertiesControllers.getProperties));
propertyRouter.post(
  "/create",
  asyncWrapper(PropertiesControllers.postProperty)
);
propertyRouter.put("/update", asyncWrapper(PropertiesControllers.putProperty));
propertyRouter.delete(
  "/delete",
  asyncWrapper(PropertiesControllers.deleteProperty)
);

module.exports = propertyRouter;
