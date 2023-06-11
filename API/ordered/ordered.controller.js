const orderedModel = require("./ordered.model");
const mongoose = require("mongoose");
const LiqPay = require("../../service/liqpay");

const {
  Types: { ObjectId },
} = mongoose;

const getOrderedList = async (req, res, next) => {
  const list = await orderedModel.find();

  return res.status(200).json({ data: list });
};

const getOrderedByUser = async (req, res, next) => {
  const list = await orderedModel.find({ user_id: req.user_id });

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

  const liqpay = new LiqPay(
    process.env.PAYMENT_PUBLIC_KEY,
    process.env.PAYMENT_PRIVATE_KEY
  );

  const html = liqpay.cnb_form({
    action: "pay",
    //amount: req.body.total,
    amount: "0.1",
    currency: "UAH",
    description: "Оплата товарів",
    order_id: saved._id,
    version: "3",
    result_url: `http://localhost:3000/checkout/success/${saved._id}`,
    // rro_info: { items: req.body.products },
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

  return res.status(200).json({ data: html });
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
