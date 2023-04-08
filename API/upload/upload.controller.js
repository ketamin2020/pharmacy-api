const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadToS3 } = require("../services/s3");
const uploadModel = require("./upload.model");
const httpStatus = require("http-status");
const uploadFile = async (req, res, next) => {
  if (!req || !req.file)
    return res
      .status(404)
      .json({ file: message, error: httpStatus["404_MESSAGE"] });

  const response = await uploadToS3(req.file);
  const file = uploadModel({
    url: response.Location,
    key: response.Key,
  });
  const newFile = await file.save();
  await unlinkFile(req.file.path);
  res.status(200).send({ data: { url: newFile.url, id: newFile._id } });
};

const getFile = async (req, res) => {
  const key = req.params.key;
};

const deleteFile = async (req, res) => {
  const id = req.params.id;
};

module.exports = { uploadFile, deleteFile };
