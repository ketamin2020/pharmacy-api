const partnerModel = require("./partner.model");
const slugify = require("slugify");
const getPartners = async (req, res, next) => {
  const allPartners = await partnerModel.find({});

  const partnerList = allPartners.reduce((list, partner) => {
    list.push({
      id: partner._id,
      name: partner.name,
      full_address: partner.full_address,
      common_phone: partner.common_phone,
      common_email: partner.common_email,
      ordering_email: partner.ordering_email,
      ordering_phone: partner.ordering_phone,
      business_hours: partner.business_hours,
    });
    return list;
  }, []);
  return res.status(200).send({ data: partnerList });
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
