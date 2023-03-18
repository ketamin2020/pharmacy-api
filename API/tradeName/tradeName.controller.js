const httpStatus = require("http-status");
const tradeNameModel = require("./tradeName.model");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const getTradeNames = async (req, res, next) => {
  const allTradeNames = await tradeNameModel.find({});

  const tradeNameList = allTradeNames.reduce((list, trade) => {
    list.push({
      id: trade._id,
      name: trade.name,
    });
    return list;
  }, []);
  return res.status(200).send({ data: tradeNameList });
};
const postTradeName = async (req, res, next) => {
  const { name } = req.body;
  const tradeName = new tradeNameModel({
    name,
  });
  const savedName = await tradeName.save();
  return res
    .status(200)
    .send({ data: { id: savedName._id, name: savedName.name } });
};
const putTradeName = async (req, res, next) => {
  const { id, name } = req.body;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });

  await tradeNameModel.findByIdAndUpdate(
    { _id: id },
    {
      name,
    }
  );
  return res
    .status(200)
    .send({ message: "Trade name was updated successfuly!" });
};
const deleteTradeName = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await tradeNameModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Trade name was deleted successfuly!" });
};

module.exports = {
  getTradeNames,
  postTradeName,
  putTradeName,
  deleteTradeName,
};
