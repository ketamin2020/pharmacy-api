const makersModel = require("./makers.model");
const pick = require("../../utils/pick.js");

const getMakers = async (req, res, next) => {
  const filter = pick(req.query, [
    "full_name",
    "short_name",
    "country",
    "factory",
    "slug",
    "created_at",
    "updated_at",
  ]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const data = await makersModel.paginate(filter, options);
  return res.status(200).send({ data });
};
const postMaker = async (req, res, next) => {
  // const { first_name } = req.body;
  // const slug = slugify(first_name, {
  //   replacement: "-", // replace spaces with replacement character, defaults to `-`
  //   lower: true, // convert to lower case, defaults to `false`
  // });

  const maker = new makersModel({ ...req.body });
  const newMaker = await maker.save();
  return res.status(200).send({ data: newMaker });
};
const putMaker = (req, res, next) => {};
const deleteMaker = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await makersModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Makers was deleted successfuly!" });
};

module.exports = { getMakers, postMaker, putMaker, deleteMaker };
