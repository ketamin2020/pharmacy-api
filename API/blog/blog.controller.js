const blogModel = require("./blog.model");
const pick = require("../../utils/pick.js");

const getBlogs = async (req, res, next) => {
  const filter = pick(req.query, ["name", "created_at", "updated_at"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  options.populate = "type";

  const data = await blogModel.paginate(filter, options);

  return res.status(200).send({ data });
};
const postBlog = async (req, res, next) => {
  const qty = new blogModel({ ...req.body });
  const newQty = await qty.save();
  return res.status(200).send({ data: newQty });
};
const putBlog = async (req, res, next) => {
  const updated = await blogModel.findByIdAndUpdate(
    { _id: req.body.id },
    req.body
  );

  return res.status(200).send({ data: updated });
};

const deleteBlog = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await blogModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Blog was deleted successfuly!" });
};

module.exports = { getBlogs, postBlog, putBlog, deleteBlog };
