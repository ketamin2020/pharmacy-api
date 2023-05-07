const basketModel = require("./basket.model");
const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose;
const getBasketList = async (req, res, next) => {
  const list = await basketModel.find({ user_id: req.user._id });
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

const getBasketListByUser = async (req, res, next) => {
  const data = await basketModel.aggregate([
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
      $unwind: "$price",
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
      $unwind: "$images",
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
      $unwind: "$reviews",
    },
    {
      $match: { "price._id": { $exists: true } },
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
  return res.status(200).send({ data: data?.[0] || [] });
};

const postBasket = async (req, res, next) => {
  const { productId } = req.body;

  const wish = await basketModel.findOneAndUpdate(
    { user_id: req.user._id },
    { $push: { products: { $each: [productId] } } },
    { new: true, upsert: true }
  );

  return res.status(200).send({ data: wish });
};
const putBasket = (req, res, next) => {};
const deleteBasket = async (req, res, next) => {
  const { id } = req.query;

  const result = await basketModel.updateOne(
    { user_id: ObjectId(req.user._id) },
    { $pull: { products: id } }
  );
  res.status(200).send({ message: "Wishes was deleted successfuly!" });
};

module.exports = {
  getBasketList,
  getBasketListByUser,
  postBasket,
  putBasket,
  deleteBasket,
};
