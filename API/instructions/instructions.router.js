const { Router } = require("express");

const InstructionsControllers = require("./instructions.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const instructionRouter = Router();

instructionRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(InstructionsControllers.getInstructions)
);
instructionRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(InstructionsControllers.postInstruction)
);
instructionRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(InstructionsControllers.putInstruction)
);
instructionRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(InstructionsControllers.deleteInstruction)
);

module.exports = instructionRouter;
