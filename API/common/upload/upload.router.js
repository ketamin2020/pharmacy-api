require("dotenv").config();
const { Router } = require("express");
const { uploadFile } = require("./upload.controller");
const asyncWrapper = require("../../../utils/asyncWrapper");
const uploadRouter = Router();
const upload = require("./multer");
const { uploadFile, deleteFile } = require("../../services/s3");
uploadRouter.post(
  "/upload-single",
  upload.single("file"),
  asyncWrapper(uploadFile)
);
uploadRouter.delete("/delete-single/:id", asyncWrapper(deleteFile));

module.exports = uploadRouter;
