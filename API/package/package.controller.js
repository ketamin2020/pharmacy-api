const packageModel = require("./package.model");

const getPeckages = async (req, res, next) => {
  const all = await packageModel.find({});

  const list = all.reduce((list, item) => {
    list.push({
      id: item._id,
      name: item.name,
      slug: item.slug,
    });
    return list;
  }, []);
  return res.status(200).send({ data: list });
};
const postPeckage = async (req, res, next) => {
  const item = new packageModel({ ...req.body });
  const newItem = await item.save();
  return res.status(200).send({ data: newItem });
};
const putPeckage = (req, res, next) => {};
const deletePeckage = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await packageModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Peckage  was deleted successfuly!" });
};

module.exports = {
  getPeckages,
  postPeckage,
  putPeckage,
  deletePeckage,
};
