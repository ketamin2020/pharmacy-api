const priceModel = require("./price.model");

const getPrices = async (req, res, next) => {
  const items = await priceModel.find({}).populate("partner");

  const arr = items.reduce((acc, item) => {
    acc.push({
      id: item._id,
      morion: item.morion,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      date: item.date,
      current: item.current,
      code: item.code,
      previous_price: item.previous_price,
      partner: { id: item.partner._id, name: item.partner.name },
    });
    return acc;
  }, []);

  return res.status(200).send({ data: arr });
};
const postPrice = async (req, res, next) => {
  const objToCreate = {
    ...req.body,
    previous_price: req.body.current,
  };

  const newItem = await new priceModel(objToCreate);
  await newItem.save();
  return res.status(200).send({ data: newItem });
};

const updatePrice = async (req, res, next) => {
  const { id, name, morion, current } = req.body;
  const item = await priceModel.findById({ _id: id });
  console.log(item);
  const newItem = await priceModel.findOneAndUpdate(
    { _id: id },
    {
      name,
      morion,
      current,
      previous_price: item.previous_price,
    }
  );

  return res.status(200).send({ data: newItem });
};
const deletePrice = async (req, res, next) => {
  const { id } = req.query;
  await priceModel.findOneAndDelete({ _id: id });
  return res.status(200).send({ message: "Image was deleted successfuly!" });
};

module.exports = { getPrices, postPrice, updatePrice, deletePrice };
