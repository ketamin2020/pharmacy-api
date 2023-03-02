const { Router } = require("express");

const PartnerControllers = require("./partner.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const partnerRouter = Router();

partnerRouter.get("/get", asyncWrapper(PartnerControllers.getPartners));
partnerRouter.post("/create", asyncWrapper(PartnerControllers.postPartner));
partnerRouter.put("/update", asyncWrapper(PartnerControllers.putPartner));
partnerRouter.delete("/delete", asyncWrapper(PartnerControllers.deletePartner));

module.exports = partnerRouter;
