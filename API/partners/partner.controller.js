const partnerModel = require("./partner.model");
const slugify = require("slugify");
const pick = require("../../utils/pick.js");
const getPartners = async (req, res, next) => {
  const filter = pick(req.query, ["first_name"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const data = await partnerModel.paginate(filter, options);
  return res.status(200).send({ data });
};
const postPartner = async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
  });

  const partner = new partnerModel({ ...req.body, slug });
  const newBrand = await partner.save();
  return res.status(200).send({ data: newBrand });
};
const putPartner = (req, res, next) => {};
const deletePartner = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await partnerModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Partner was deleted successfuly!" });
};

module.exports = { getPartners, postPartner, putPartner, deletePartner };
