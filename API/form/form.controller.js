const formModel = require("./form.model");

const getForms = async (req, res, next) => {
  const allForms = await formModel.find({});

  const formList = allForms.reduce((list, form) => {
    list.push({
      id: form._id,
      name: form.name,
      slug: form.slug,
    });
    return list;
  }, []);
  return res.status(200).send({ data: formList });
};
const postForm = async (req, res, next) => {
  const form = new formModel({ ...req.body });
  const newMaker = await form.save();
  return res.status(200).send({ data: newMaker });
};
const putForm = (req, res, next) => {};
const deleteForm = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await formModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Form was deleted successfuly!" });
};

module.exports = { getForms, postForm, putForm, deleteForm };
