const { Router } = require("express");

const SubstancesControllers = require("./substances.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const partnerRouter = Router();

partnerRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(SubstancesControllers.getSubstances)
);
partnerRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(SubstancesControllers.postSubstance)
);
partnerRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(SubstancesControllers.putSubstance)
);
partnerRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(SubstancesControllers.deleteSubstance)
);

module.exports = partnerRouter;
