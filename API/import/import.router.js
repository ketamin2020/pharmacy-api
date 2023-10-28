const { Router } = require("express");

const importControllers = require("./import.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const upload = require("../common/multer");
const importRouter = Router();
const authMiddleware = require("../middlewares/authorization.js");

importRouter.post(
  "/import-price",
  asyncWrapper(authMiddleware.withAuth),
  upload.single("file"),
  asyncWrapper(importControllers.postImportPrice)
);

module.exports = importRouter;
