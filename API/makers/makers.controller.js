const makersModel = require("./makers.model");
const slugify = require("slugify");
const getMakers = async (req, res, next) => {
  const allMakers = await makersModel.find({});
  // full_name: { type: String, required: true },
  // short_name: { type: String, required: true },
  // country: { type: String, required: true },
  // factory: { type: String, required: true },
  // slug: { type: String, slug: "full_name" },
  // logo: {
  //   url: { type: String, required: true },
  //   slug: { type: String, slug: "full_name" },
  // },

  const makersList = allMakers.reduce((list, maker) => {
    list.push({
      id: maker._id,
      full_name: maker.full_name,
      short_name: maker.short_name,
      country: maker.country,
      factory: maker.factory,
      logo: maker.logo.url,
    });
    return list;
  }, []);
  return res.status(200).send({ data: makersList });
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
