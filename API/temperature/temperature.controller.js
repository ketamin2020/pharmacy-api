const temperatureModel = require("./temperature.model");

const getTemperatures = async (req, res, next) => {
  const all = await temperatureModel.find({});

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
const postTemperature = async (req, res, next) => {
  const item = new temperatureModel({ ...req.body });
  const newItem = await item.save();
  return res.status(200).send({ data: newItem });
};
const putTemperature = (req, res, next) => {};
const deleteTemperature = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await temperatureModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Temperature was deleted successfuly!" });
};

module.exports = {
  getTemperatures,
  postTemperature,
  putTemperature,
  deleteTemperature,
};
