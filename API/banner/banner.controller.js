const bannerModel = require("./banner.model");
const pick = require("../../utils/pick.js");

const getBanners = async (req, res, next) => {
  const filter = pick(req.query, ["first_name"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const data = await bannerModel.paginate(filter, options);

  return res.status(200).send({ data });
};
const postBanner = async (req, res, next) => {
  const newItem = await new bannerModel(req.body);
  await newItem.save();
  return res.status(200).send({ data: newItem });
};
const deleteBanner = async (req, res, next) => {
  const { id } = req.query;
  await bannerModel.findOneAndDelete({ _id: id });
  return res.status(200).send({ message: "Image was deleted successfuly!" });
};

module.exports = { getBanners, postBanner, deleteBanner };
