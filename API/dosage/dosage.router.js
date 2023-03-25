const { Router } = require("express");

const DosageControllers = require("./dosage.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const dosageRouter = Router();

dosageRouter.get("/get", asyncWrapper(DosageControllers.getDosages));
dosageRouter.post("/create", asyncWrapper(DosageControllers.postDosage));
dosageRouter.put("/update", asyncWrapper(DosageControllers.putDosage));
dosageRouter.delete("/delete", asyncWrapper(DosageControllers.deleteDosage));

module.exports = dosageRouter;
