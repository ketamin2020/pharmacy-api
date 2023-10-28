require("dotenv").config();
const { Router } = require("express");
const asyncWrapper = require("../../utils/asyncWrapper");
const uploadRouter = Router();
const upload = require("../common/multer");
const { uploadFile, deleteFile } = require("./upload.controller");
const authHiddleware = require("../middlewares/authorization.js");

uploadRouter.post(
  "/upload-single",
  asyncWrapper(authHiddleware.withAuth),
  upload.single("image"),
  asyncWrapper(uploadFile)
);

module.exports = uploadRouter;
