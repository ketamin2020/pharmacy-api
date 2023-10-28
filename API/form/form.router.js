const { Router } = require("express");

const FormControllers = require("./form.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const formRouter = Router();

formRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(FormControllers.getForms)
);
formRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(FormControllers.postForm)
);
formRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(FormControllers.putForm)
);
formRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(FormControllers.deleteForm)
);

module.exports = formRouter;
