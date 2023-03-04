const { Router } = require("express");

const InstructionsControllers = require("./instructions.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const instructionRouter = Router();

instructionRouter.get(
  "/get",
  asyncWrapper(InstructionsControllers.getInstructions)
);
instructionRouter.post(
  "/create",
  asyncWrapper(InstructionsControllers.postInstruction)
);
instructionRouter.put(
  "/update",
  asyncWrapper(InstructionsControllers.putInstruction)
);
instructionRouter.delete(
  "/delete",
  asyncWrapper(InstructionsControllers.deleteInstruction)
);

module.exports = instructionRouter;
