const { Router } = require("express");

const mainControllers = require("./main.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const mainRouter = Router();

mainRouter.get(
  "/get",

  asyncWrapper(mainControllers.getMain)
);
mainRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(mainControllers.postMain)
);
mainRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(mainControllers.putMain)
);

module.exports = mainRouter;
