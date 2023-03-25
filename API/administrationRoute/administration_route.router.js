const { Router } = require("express");

const AdministrationRouteontrollers = require("./administration_route.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const administrationRouteRouter = Router();

administrationRouteRouter.get(
  "/get",
  asyncWrapper(AdministrationRouteontrollers.getRoute)
);
administrationRouteRouter.post(
  "/create",
  asyncWrapper(AdministrationRouteontrollers.postRoute)
);
administrationRouteRouter.put(
  "/update",
  asyncWrapper(AdministrationRouteontrollers.putRoute)
);
administrationRouteRouter.delete(
  "/delete",
  asyncWrapper(AdministrationRouteontrollers.deleteRoute)
);

module.exports = administrationRouteRouter;
