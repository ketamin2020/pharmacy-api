const httpStatus = require("http-status");
const propertiesModel = require("./properties.model");
const mongoose = require("mongoose");
const slugify = require("slugify");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const pick = require("../../utils/pick.js");

const getProperties = async (req, res, next) => {
  const filter = pick(req.query, ["first_name"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const data = await propertiesModel.paginate(filter, options);
  return res.status(200).send({ data });
};
const postProperty = async (req, res, next) => {
  const { morion, external_code, name, main, warnings } = req.body;
  const instruction = new propertiesModel({
    morion,
    external_code,
    name,
    views: 1,
    sold: 1,
    attributes: {
      main: {
        items: main,
      },
      warnings: {
        items: warnings,
      },
    },
  });
  await instruction.save();
  return res.status(200).send({ data: httpStatus[200] });
};
const putProperty = async (req, res, next) => {
  const { id, morion, external_code, name, main, warnings } = req.body;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });

  await propertiesModel.findByIdAndUpdate(
    { _id: id },
    {
      morion,
      external_code,
      name,
      attributes: {
        main: {
          items: main,
        },
        warnings: {
          items: warnings,
        },
      },
    }
  );
  return res
    .status(200)
    .send({ message: "Instruction was updated successfuly!" });
};
const deleteProperty = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await propertiesModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Substances was deleted successfuly!" });
};

module.exports = {
  getProperties,
  postProperty,
  putProperty,
  deleteProperty,
};
