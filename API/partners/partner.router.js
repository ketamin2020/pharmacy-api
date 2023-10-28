const { Router } = require("express");

const PartnerControllers = require("./partner.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const partnerRouter = Router();

partnerRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PartnerControllers.getPartners)
);
partnerRouter.get(
  "/get-list",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PartnerControllers.getPartnersList)
);
partnerRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PartnerControllers.postPartner)
);
partnerRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PartnerControllers.putPartner)
);
partnerRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(PartnerControllers.deletePartner)
);

module.exports = partnerRouter;
