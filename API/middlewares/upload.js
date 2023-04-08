const { uploadFile } = require("../services/s3");
const uploadModel = require("../upload/upload.model");
const util = require("util");
const fs = require("fs");
const unlinkFile = util.promisify(fs.unlink);
const httpStatus = require("http-status");
const message = "The file is requred!";
const upload = async (req, res, next) => {
  if (!req || !req.file)
    return res
      .status(404)
      .json({ file: message, error: httpStatus["404_MESSAGE"] });

  const file = await uploadFile(req.file);
  const newFile = new uploadModel({
    file,
  });
  await newFile.save();
  await unlinkFile(req.file.path);
  next(newFile);
};

module.exports = upload;
