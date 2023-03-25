const administrationRouteModel = require("./administration_route.model");

const getRoute = async (req, res, next) => {
  const allRoute = await administrationRouteModel.find({});

  const formList = allRoute.reduce((list, route) => {
    list.push({
      id: route._id,
      name: route.name,
      slug: route.slug,
    });
    return list;
  }, []);
  return res.status(200).send({ data: formList });
};
const postRoute = async (req, res, next) => {
  const form = new administrationRouteModel({ ...req.body });
  const newMaker = await form.save();
  return res.status(200).send({ data: newMaker });
};
const putRoute = (req, res, next) => {};
const deleteRoute = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await administrationRouteModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Form was deleted successfuly!" });
};

module.exports = { getRoute, postRoute, putRoute, deleteRoute };
