const { Router } = require("express");
const authHiddleware = require("../middlewares/authorization");
const userControllers = require("./users.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const userRouter = Router();

userRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(userControllers.getUsers)
);
userRouter.get(
  "/get-by-token",

  asyncWrapper(userControllers.getUserByToken)
);
userRouter.put(
  "/update",
  asyncWrapper(authHiddleware),
  asyncWrapper(userControllers.putUser)
);
userRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware),
  asyncWrapper(userControllers.deleteUser)
);

module.exports = userRouter;
