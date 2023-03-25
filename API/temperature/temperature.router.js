const { Router } = require("express");

const TemperaturesControllers = require("./temperature.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const temperaturesRouter = Router();

temperaturesRouter.get(
  "/get",
  asyncWrapper(TemperaturesControllers.getTemperatures)
);
temperaturesRouter.post(
  "/create",
  asyncWrapper(TemperaturesControllers.postTemperature)
);
temperaturesRouter.put(
  "/update",
  asyncWrapper(TemperaturesControllers.putTemperature)
);
temperaturesRouter.delete(
  "/delete",
  asyncWrapper(TemperaturesControllers.deleteTemperature)
);

module.exports = temperaturesRouter;
