const brandsModel = require("./brands.model");
const { uploadFile } = require("../services/s3");
const slugify = require("slugify");
const httpStatus = require("http-status");
require("dotenv").config();
const getBrands = async (req, res, next) => {
  const allBrands = await brandsModel.find({});

  const brandsList = allBrands.reduce((list, brand) => {
    list.push({
      id: brand._id,
      name: brand.name,
      image: brand.logo.url,
      url: brand.url,
      created_at: brand.createdAt,
    });
    return list;
  }, []);
  return res.status(200).send({ data: brandsList });
};
const postBrand = async (req, res, next) => {
  const { name, url, logo } = req.body;
  const slug = slugify(name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
  });

  const brand = new brandsModel({
    name,
    url,
    logo,
    slug,
  });
  const newBrand = await brand.save();
  return res
    .status(200)
    .send({ id: newBrand._id, name: newBrand.name, logo: newBrand.logo });
};
const putBrand = (req, res, next) => {};
const deleteBrand = async (req, res, next) => {
  const { id } = req.query;
  console.log(req, id);
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await brandsModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Brand was deleted successfuly!" });
};

module.exports = { getBrands, postBrand, putBrand, deleteBrand };
