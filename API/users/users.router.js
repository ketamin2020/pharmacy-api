const { Router } = require("express");

const UsersControllers = require("./users.controllers");
const asyncWrapper = require("../../utils/asyncWrapper");

const userRouter = Router();

userRouter.get("/get", asyncWrapper(UsersControllers.getCurrentUser));
userRouter.post("/create", asyncWrapper(UsersControllers.getCurrentUser));
userRouter.put("/update", asyncWrapper(UsersControllers.getCurrentUser));
userRouter.delete("/delete", asyncWrapper(UsersControllers.getCurrentUser));

module.exports = userRouter;
