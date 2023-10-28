const { Router } = require("express");

const WorkerControllers = require("./worker.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const workerRouter = Router();

workerRouter.get(
  "/get",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(WorkerControllers.getWorkers)
);
workerRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(WorkerControllers.postWorker)
);
workerRouter.post(
  "/login",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(WorkerControllers.loginWorker)
);
workerRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(WorkerControllers.putWorker)
);
workerRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(WorkerControllers.deleteWorker)
);

module.exports = workerRouter;
