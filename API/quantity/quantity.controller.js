const quantityModel = require("./quantity.model");

const getQuantity = async (req, res, next) => {
  const allQty = await quantityModel.find({});

  const list = allQty.reduce((list, qty) => {
    list.push({
      id: qty._id,
      name: qty.name,
      slug: qty.slug,
    });
    return list;
  }, []);
  return res.status(200).send({ data: list });
};
const postQuantity = async (req, res, next) => {
  const qty = new quantityModel({ ...req.body });
  const newQty = await qty.save();
  return res.status(200).send({ data: newQty });
};
const putQuantity = (req, res, next) => {};
const deleteQuantity = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await quantityModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Qty was deleted successfuly!" });
};

module.exports = { getQuantity, postQuantity, putQuantity, deleteQuantity };
