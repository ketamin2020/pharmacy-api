const wishModel = require("./wish.model");
const propertyModel = require("../properties/properties.model");
const userModel = require("../users/users.model");
const priceModel = require("../price/price.model");
const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose;
const getWishList = async (req, res, next) => {
  const list = await wishModel.find({ user_id: req.user._id });
  const prepareList = list.reduce((list, item) => {
    list.push({
      id: item._id,
      products: item.products,
      user_id: item.user_id,
      created_at: item.createdAt,
    });
    return list;
  }, []);
  return res.status(200).send({ data: prepareList?.[0] });
};

const getWishListByUser = async (req, res, next) => {
  const data = await wishModel.aggregate([
    {
      $match: { user_id: ObjectId(req.user._id) },
    },
    {
      $lookup: {
        from: "properties",
        localField: "products",
        foreignField: "_id",
        as: "properties",
      },
    },
    {
      $unwind: "$properties",
    },
    {
      $lookup: {
        from: "prices",
        localField: "properties.morion",
        foreignField: "morion",
        as: "price",
      },
    },
    {
      $unwind: {
        path: "$price",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "images",
        localField: "properties.morion",
        foreignField: "morion",
        as: "images",
      },
    },
    {
      $unwind: {
        path: "$images",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "properties.morion",
        foreignField: "morion",
        as: "reviews",
      },
    },
    {
      $unwind: {
        path: "$reviews",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        $or: [
          { "price._id": { $exists: true } },
          { "price._id": null }, // Добавляем условие для случаев, когда _id в price отсутствует
        ],
      },
    },
    {
      $group: {
        _id: "$_id",
        user_id: { $first: "$user_id" },
        products: {
          $push: {
            id: "$properties._id",
            property: "$properties",
            price: "$price",
            images: "$images",
            reviews: "$reviews",
          },
        },
        created_at: { $first: "$createdAt" },
        updated_at: { $first: "$updatedAt" },
      },
    },
    {
      $addFields: {
        products: {
          $reduce: {
            input: "$products",
            initialValue: [],
            in: {
              $cond: [
                { $in: ["$$this.property._id", "$$value.property._id"] },
                "$$value",
                { $concatArrays: ["$$value", ["$$this"]] },
              ],
            },
          },
        },
      },
    },
  ]);
  return res.status(200).send({ data: data?.[0] });
};

const postWish = async (req, res, next) => {
  const { productId } = req.body;

  const wish = await wishModel.findOneAndUpdate(
    { user_id: req.user._id },
    { $push: { products: { $each: [productId] } } },
    { new: true, upsert: true }
  );

  return res.status(200).send({ data: wish });
};
const putWish = (req, res, next) => {};
const deleteWish = async (req, res, next) => {
  const { id } = req.query;

  const result = await wishModel.updateOne(
    { user_id: ObjectId(req.user._id) },
    { $pull: { products: id } }
  );
  res.status(200).send({ message: "Wishes was deleted successfuly!" });
};

module.exports = {
  getWishList,
  postWish,
  putWish,
  deleteWish,
  getWishListByUser,
};
