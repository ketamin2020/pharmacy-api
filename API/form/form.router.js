const { Router } = require("express");

const FormControllers = require("./form.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const formRouter = Router();

formRouter.get("/get", asyncWrapper(FormControllers.getForms));
formRouter.post("/create", asyncWrapper(FormControllers.postForm));
formRouter.put("/update", asyncWrapper(FormControllers.putForm));
formRouter.delete("/delete", asyncWrapper(FormControllers.deleteForm));

module.exports = formRouter;
