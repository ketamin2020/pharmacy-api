const wishModel = require("./wish.model");
const userModel = require("../users/users.model");
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
  // const { id } = req.query;
  // console.log(req, id);
  // if (!id)
  //   return res
  //     .status(404)
  //     .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  // await brandsModel.deleteOne({ _id: id });
  // res.status(200).send({ message: "Brand was deleted successfuly!" });
};

module.exports = { getWishList, postWish, putWish, deleteWish };
