const soldModel = require("./sold.model");

const getSoldList = async (req, res, next) => {
  const list = await soldModel.find();

  return res.status(200).json({ data: list });
};

module.exports = {
  getSoldList,
};
