const { Router } = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadSingleImage } = require("./upload.controller");

const asyncWrapper = require("../../../utils/asyncWrapper");

const uploadRouter = Router();

const upload = require("./multer");
const { uploadFile } = require("../../services/s3");
uploadRouter.post(
  "/upload-single",
  upload.single("file"),
  async (req, res) => {
    console.log(req, "req");
    const response = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    res.status(200).send({ response });
  }
  // asyncWrapper(uploadSingleImage)
);

module.exports = uploadRouter;
