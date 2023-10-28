const { Router } = require("express");

const AdministrationRouteontrollers = require("./administration_route.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const administrationRouteRouter = Router();

administrationRouteRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(AdministrationRouteontrollers.getRoute)
);
administrationRouteRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(AdministrationRouteontrollers.postRoute)
);
administrationRouteRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(AdministrationRouteontrollers.putRoute)
);
administrationRouteRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(AdministrationRouteontrollers.deleteRoute)
);

module.exports = administrationRouteRouter;
