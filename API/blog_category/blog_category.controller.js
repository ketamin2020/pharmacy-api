const blogCategoryModel = require("./blog_category.model");

const getCategory = async (req, res, next) => {
  const list = await blogCategoryModel.find({});
  return res.status(200).send({ data: list });
};
const postCategory = async (req, res, next) => {
  const qty = new blogCategoryModel({ ...req.body });
  const newQty = await qty.save();
  return res.status(200).send({ data: newQty });
};
const putCategory = (req, res, next) => {};

const deleteCategory = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await blogCategoryModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Category was deleted successfuly!" });
};

module.exports = { getCategory, postCategory, putCategory, deleteCategory };
