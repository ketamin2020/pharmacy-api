const { Router } = require("express");

const mainControllers = require("./main.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const mainRouter = Router();

mainRouter.get("/get", asyncWrapper(mainControllers.getMain));
mainRouter.post("/create", asyncWrapper(mainControllers.postMain));
mainRouter.put("/update", asyncWrapper(mainControllers.putMain));

module.exports = mainRouter;
