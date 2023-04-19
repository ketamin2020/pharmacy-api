const reviewModel = require("./reviews.model");
const usersModel = require("../users/users.model");
const getReviews = async (req, res, next) => {
  // const banners = await reviewModel.find({});
  // const arr = banners.reduce((acc, item) => {
  //   acc.push({
  //     id: item._id,
  //     link: item.link,
  //     createdAt: item.createdAt,
  //     link_id: item.id,
  //   });
  //   return acc;
  // }, []);
  // return res.status(200).send({ data: arr });
};

const getLastReviews = async (req, res, next) => {
  const reviews = await reviewModel.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: { author: "$author", property: "$property" },
        review: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$review" } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $lookup: {
        from: "properties",
        localField: "property",
        foreignField: "_id",
        as: "property",
      },
    },
    { $unwind: "$author" },
    { $unwind: "$property" },
    {
      $lookup: {
        from: "images",
        let: { morion: "$property.morion" },
        pipeline: [
          { $match: { $expr: { $eq: ["$morion", "$$morion"] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 5 },
        ],
        as: "property.images",
      },
    },
    { $unwind: "$property.images" },
    { $group: { _id: "$property.morion", data: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$data" } },
    { $limit: 20 },
  ]);

  const prepareData = reviews.reduce((acc, item) => {
    acc.push({
      id: item._id,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
      text: item.text,
      status: item.status,
      rate: item.rate,
      anonim: item.anonim,
      author: {
        first_name: item.author.first_name,
        last_name: item.author.last_name,
        id: item.author._id,
      },
      property: {
        id: item.property._id,
        morion: item.property.morion,
        name: item.property.name,
        images: item.property.images.items?.filter((image) => !!image.id),
      },
    });
    return acc;
  }, []);

  return res.status(200).send({ data: prepareData });
};

const getReviewsByPropertyId = async (req, res, next) => {
  const reviews = await reviewModel.find({ property: req.query.id }).populate({
    path: "author",
    select: "first_name last_name middle_name",
  });

  const reviewsList = reviews.reduce((acc, item) => {
    acc.push({
      author: {
        first_name: item.author.first_name || "",
        last_name: item.author.last_name || "",
        middle_name: item.author.middle_name || "",
        id: item.author._id,
      },
      bought: item.bought,
      comments: item.comments,
      created_at: item.createdAt,
      dislikesCount: item.dislikesCount,
      likesCount: item.likesCount,
      rate: item.rate,
      text: item.text,
      id: item._id,
    });
    return acc;
  }, []);

  return res.status(200).send({ data: reviewsList });
};

const postReview = async (req, res, next) => {
  const newItem = await new reviewModel({ ...req.body, author: req.user._id });

  await newItem.save();

  await usersModel.findByIdAndUpdate(
    req.user._id,
    {
      $push: { reviews: newItem._id },
    },
    { safe: true, upsert: true, new: true }
  );

  const item = await reviewModel.findById(newItem._id).populate("author");

  return res.status(200).send({ data: item });
};
const deleteReview = async (req, res, next) => {
  // const { id } = req.query;
  // await bannerModel.findOneAndDelete({ _id: id });
  // return res.status(200).send({ message: "Image was deleted successfuly!" });
};

module.exports = {
  getReviews,
  postReview,
  deleteReview,
  getReviewsByPropertyId,
  getLastReviews,
};
