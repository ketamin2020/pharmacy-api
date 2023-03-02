require("dotenv").config();
const { Router } = require("express");
const asyncWrapper = require("../../utils/asyncWrapper");
const uploadRouter = Router();
const upload = require("../common/multer");
const { uploadFile, deleteFile } = require("./upload.controller");

uploadRouter.post(
  "/upload-single",
  upload.single("image"),
  asyncWrapper(uploadFile)
);
// uploadRouter.delete("/delete-single/:id", asyncWrapper(deleteFile));

module.exports = uploadRouter;
