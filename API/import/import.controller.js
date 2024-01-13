const importModel = require("./import.model");
const priceModel = require("../price/price.model");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadToS3 } = require("../services/s3");
const xlsx = require("xlsx");
const httpStatus = require("http-status");

function formatArray(inputArray, additionalInfo) {
  const additionalKey = "partner";

  return inputArray.map((item) => {
    const formattedItem = {};
    for (const key in additionalInfo) {
      const targetKey = additionalInfo[key];

      if (item[targetKey] !== undefined) {
        formattedItem[key] = +item[targetKey];
      }
      formattedItem[additionalKey] = additionalInfo[additionalKey];
    }
    return formattedItem;
  });
}

async function savePricesToDatabase(pricesArray) {
  for (const priceData of pricesArray) {
    const existingPrice = await priceModel.findOne({
      morion: priceData.morion,
    });

    if (existingPrice) {
      existingPrice.previous_price = existingPrice.current;
      existingPrice.current = priceData.price;

      await existingPrice.save();
    } else {
      await priceModel.create({
        code: priceData.code,
        current: priceData.price,
        morion: priceData.morion,
        partner: priceData.partner,
      });
    }
  }
}

const postImportPrice = async (req, res, next) => {
  if (!req || !req.file)
    return res
      .status(404)
      .json({ file: message, error: httpStatus["404_MESSAGE"] });

  const filePath = req.file.path;

  const headersToParse = req.body.data;

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  const dataToStore = formatArray(jsonData, JSON.parse(headersToParse));

  await savePricesToDatabase(dataToStore);

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
