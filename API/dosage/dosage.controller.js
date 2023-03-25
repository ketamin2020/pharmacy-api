const dosageModel = require("./dosage.model");

const getDosages = async (req, res, next) => {
  const all = await dosageModel.find({});

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
const postDosage = async (req, res, next) => {
  const item = new dosageModel({ ...req.body });
  const newItem = await item.save();
  return res.status(200).send({ data: newItem });
};
const putDosage = (req, res, next) => {};
const deleteDosage = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await dosageModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Peckage  was deleted successfuly!" });
};

module.exports = {
  getDosages,
  postDosage,
  putDosage,
  deleteDosage,
};
