const substancesModel = require("./substances.model");

const getSubstances = async (req, res, next) => {
  const allSubstances = await substancesModel.find({});
  const subctancesList = allSubstances.reduce((list, subctance) => {
    list.push({
      id: subctance._id,
      name_ua: subctance.name_ua,
      name_eu: subctance.name_eu,
      index: subctance.index,
      head_title: subctance.head_title,
    });
    return list;
  }, []);
  return res.status(200).send({ data: subctancesList });
};
const postSubstance = async (req, res, next) => {
  const { name_eu } = req.body;

  const firstChartUA = name_eu[0].toLowerCase();
  const firstChartEU = name_eu[0].toUpperCase();

  const substance = new substancesModel({
    ...req.body,
    index: firstChartUA,
    head_title: `Препарати на ${firstChartEU}`,
  });
  const newSubstance = await substance.save();
  return res.status(200).send({ data: newSubstance });
};
const putSubstance = (req, res, next) => {};
const deleteSubstance = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await substancesModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Substances was deleted successfuly!" });
};

module.exports = {
  getSubstances,
  postSubstance,
  putSubstance,
  deleteSubstance,
};
