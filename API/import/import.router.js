const { Router } = require("express");

const importControllers = require("./import.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const upload = require("../common/multer");
const importRouter = Router();

importRouter.post(
  "/import-price",
  upload.single('file'),
  asyncWrapper(importControllers.postImportPrice)
);

module.exports = importRouter;
