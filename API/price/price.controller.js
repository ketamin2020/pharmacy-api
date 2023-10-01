const priceModel = require("./price.model");
const pick = require("../../utils/pick");

const getPrices = async (req, res, next) => {
  const filter = pick(req.query, ["first_name"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);
  options.populate = "partner";

  const items = await priceModel.paginate(filter, options);

  return res.status(200).send({ data: items });
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
  const { id, name, morion, current, partner } = req.body;
  const item = await priceModel.findById({ _id: id });

  const newItem = await priceModel.findOneAndUpdate(
    { _id: id },
    {
      name,
      morion,
      current,
      partner,
      previous_price: current,
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
