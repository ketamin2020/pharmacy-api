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
};
