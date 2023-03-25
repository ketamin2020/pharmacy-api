const mainModel = require("./main.model");

const getMain = async (req, res, next) => {
  const main = await mainModel.find();
  if (main.length) {
    return res.status(200).send({ data: main[0] });
  }
  return res.status(200).send({ data: null });
};
const postMain = async (req, res, next) => {
  const main = new mainModel(req.body);
  const newMain = await main.save();
  return res.status(200).send({ data: newMain });
};
const putMain = async (req, res, next) => {
  await mainModel.findOneAndUpdate({ _id: req.body.id }, req.body);
  return res.status(200).send({ message: "Main was updated successfuly!" });
};

module.exports = { getMain, postMain, putMain };
