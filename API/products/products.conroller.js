const productsModel = require("./products.model");
const { uploadFile } = require("../services/s3");
const slugify = require("slugify");
const httpStatus = require("http-status");
require("dotenv").config();
const getProducts = async (req, res, next) => {
  const allProducts = await productsModel.find({});

  const productList = allProducts.reduce((list, brand) => {
    list.push({
      id: brand._id,
      name: brand.name,
      image: brand.logo.url,
      url: brand.url,
      created_at: brand.createdAt,
    });
    return list;
  }, []);
  return res.status(200).send({ data: productList });
};
const postProduct = async (req, res, next) => {
  // const { name, url, logo } = req.body;
  // const slug = slugify(name, {
  //   replacement: "-", // replace spaces with replacement character, defaults to `-`
  //   lower: true, // convert to lower case, defaults to `false`
  // });
  // const brand = new brandsModel({
  //   name,
  //   url,
  //   logo,
  //   slug,
  // });
  // const newBrand = await brand.save();
  // return res
  //   .status(200)
  //   .send({ id: newBrand._id, name: newBrand.name, logo: newBrand.logo });
};
const putProduct = (req, res, next) => {};
const deleteProduct = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await productsModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Brand was deleted successfuly!" });
};

module.exports = { getProducts, postProduct, putProduct, deleteProduct };
