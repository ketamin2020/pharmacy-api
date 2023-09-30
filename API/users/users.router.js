const { Router } = require("express");
const authHiddleware = require("../middlewares/authorization");
const userControllers = require("./users.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const { auth } = require("../middlewares/auth");
const userRouter = Router();

userRouter.get("/get", asyncWrapper(userControllers.getUsers));
userRouter.get(
  "/get-by-token",

  asyncWrapper(userControllers.getUserByToken)
);
userRouter.put("/update", asyncWrapper(userControllers.putUser));
userRouter.delete("/delete", asyncWrapper(userControllers.deleteUser));

module.exports = userRouter;
