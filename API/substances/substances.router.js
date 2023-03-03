const { Router } = require("express");

const SubstancesControllers = require("./substances.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const partnerRouter = Router();

partnerRouter.get("/get", asyncWrapper(SubstancesControllers.getSubstances));
partnerRouter.post(
  "/create",
  asyncWrapper(SubstancesControllers.postSubstance)
);
partnerRouter.put("/update", asyncWrapper(SubstancesControllers.putSubstance));
partnerRouter.delete(
  "/delete",
  asyncWrapper(SubstancesControllers.deleteSubstance)
);

module.exports = partnerRouter;
