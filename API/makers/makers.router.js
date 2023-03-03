const { Router } = require("express");

const MakerControllers = require("./makers.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const makerRouter = Router();

makerRouter.get("/get", asyncWrapper(MakerControllers.getMakers));
makerRouter.post("/create", asyncWrapper(MakerControllers.postMaker));
makerRouter.put("/update", asyncWrapper(MakerControllers.putMaker));
makerRouter.delete("/delete", asyncWrapper(MakerControllers.deleteMaker));

module.exports = makerRouter;
