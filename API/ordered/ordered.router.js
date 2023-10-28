const { Router } = require("express");
const authMiddleware = require("../middlewares/authorization");
const orderedControllers = require("./ordered.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const orderedRouter = Router();

orderedRouter.get(
  "/ordered",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(orderedControllers.getOrderedList)
);
orderedRouter.get(
  "/user-ordered",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(orderedControllers.getOrderedByUser)
);
orderedRouter.get(
  "/ordered-id",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(orderedControllers.getOrderedById)
);
orderedRouter.post(
  "/ordered-create",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(orderedControllers.postOrdered)
);
orderedRouter.put(
  "/ordered-update",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(orderedControllers.putOrdered)
);
orderedRouter.delete(
  "/ordered-delete",
  asyncWrapper(authMiddleware.withAuth),
  asyncWrapper(orderedControllers.deleteOrdered)
);

module.exports = orderedRouter;
