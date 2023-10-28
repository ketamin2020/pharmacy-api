const { Router } = require("express");

const DosageControllers = require("./dosage.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const dosageRouter = Router();

dosageRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(DosageControllers.getDosages)
);
dosageRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(DosageControllers.postDosage)
);
dosageRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(DosageControllers.putDosage)
);
dosageRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(DosageControllers.deleteDosage)
);

module.exports = dosageRouter;
