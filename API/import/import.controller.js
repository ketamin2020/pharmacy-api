const importModel = require("./import.model");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadToS3 } = require("../services/s3");
const xlsx = require("xlsx");
const httpStatus = require("http-status");

const postImportPrice = async (req, res, next) => {
  if (!req || !req.file)
    return res
      .status(404)
      .json({ file: message, error: httpStatus["404_MESSAGE"] });

  const filePath = req.file.path;

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  console.log(jsonData, "jsonData");

  const response = await uploadToS3(req.file);
  const file = importModel({
    link: response.Location,
    name: response.Key,
  });
  await file.save();
  await unlinkFile(req.file.path);

  return res.status(200).send({ data: file });
};

module.exports = { postImportPrice };
