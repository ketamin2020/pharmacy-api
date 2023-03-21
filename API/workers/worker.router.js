const { Router } = require("express");

const WorkerControllers = require("./worker.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const workerRouter = Router();

workerRouter.get("/get", asyncWrapper(WorkerControllers.getWorkers));
workerRouter.post("/create", asyncWrapper(WorkerControllers.postWorker));
workerRouter.post("/login", asyncWrapper(WorkerControllers.loginWorker));
workerRouter.put("/update", asyncWrapper(WorkerControllers.putWorker));
workerRouter.delete("/delete", asyncWrapper(WorkerControllers.deleteWorker));

module.exports = workerRouter;
