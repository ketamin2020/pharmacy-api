const { Router } = require("express");

const TemperaturesControllers = require("./temperature.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const temperaturesRouter = Router();

temperaturesRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(TemperaturesControllers.getTemperatures)
);
temperaturesRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(TemperaturesControllers.postTemperature)
);
temperaturesRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(TemperaturesControllers.putTemperature)
);
temperaturesRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(TemperaturesControllers.deleteTemperature)
);

module.exports = temperaturesRouter;
