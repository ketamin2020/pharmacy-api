const orderedModel = require("./ordered.model");
const wishModel = require("../wish/wish.model");
const basketModel = require("../basket/basket.model");
const mongoose = require("mongoose");
const LiqPay = require("../../service/liqpay");
const pick = require("../../utils/pick.js");

const {
  Types: { ObjectId },
} = mongoose;

const getOrderedList = async (req, res, next) => {
  const filter = pick(req.query, ["first_name"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const data = await orderedModel.paginate(filter, options);

  return res.status(200).json({ data });
};

const getOrderedByUser = async (req, res, next) => {
  const list = await orderedModel.find({ user_id: req.user._id });

  return res.status(200).json({ data: list });
};
const getOrderedById = async (req, res, next) => {
  const list = await orderedModel.findOne({ _id: req.query.orderId }).lean();
  if (list) {
    return res.status(200).json({ data: list });
  }
  return res.status(200).json({ data: {} });
};

const postOrdered = async (req, res, next) => {
  const newOrder = new orderedModel(req.body);

  const saved = await newOrder.save();

  const removeFromWishes = await wishModel.findByIdAndDelete(
    req.body.basket_id
  );
  const removeFromBasket = await basketModel.findByIdAndDelete(
    req.body.basket_id
  );

  const liqpay = new LiqPay(
    process.env.PAYMENT_PUBLIC_KEY,
    process.env.PAYMENT_PRIVATE_KEY
  );

  const html = liqpay.cnb_form({
    action: "pay",
    amount: req.body.total,
    amount: "0.1",
    currency: "UAH",
    description: "Оплата товарів",
    order_id: saved._id,
    version: "3",
    result_url: `http://localhost:3000/checkout/success/${saved._id}`,
    rro_info: { items: req.body.products },
  });

  // liqpay.api(
  //   "request",
  //   {
  //     action: "status",
  //     version: "3",
  //     order_id: "6485003f299d804925a49898",
  //   },
  //   function (json) {
  //     console.log(json);
  //   }
  // );

  return res.status(200).json({ data: html, order: saved });
};
const putOrdered = (req, res, next) => {};

const deleteOrdered = async (req, res, next) => {};

module.exports = {
  getOrderedList,
  getOrderedByUser,
  postOrdered,
  putOrdered,
  deleteOrdered,
  getOrderedById,
};
