const { Router } = require("express");
const authMiddleware = require("../middlewares/authorization");
const soldControllers = require("./sold.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const soldRouter = Router();

soldRouter.get(
  "/sold-out",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(soldControllers.getSoldList)
);

module.exports = soldRouter;
