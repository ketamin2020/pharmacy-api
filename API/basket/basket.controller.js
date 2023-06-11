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
  const pipeline = [
    {
      $match: { user_id: ObjectId(req.user._id) },
    },
    {
      $lookup: {
        from: "properties",
        localField: "products.product",
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
            qty: "$products.qty",
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
    {
      $project: {
        _id: 1,
        user_id: 1,
        products: {
          $map: {
            input: "$products",
            as: "product",
            in: {
              $mergeObjects: [
                "$$product",
                {
                  qty: {
                    $arrayElemAt: [
                      "$$product.qty",
                      {
                        $indexOfArray: [
                          "$products.property._id",
                          "$$product.property._id",
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },

        created_at: 1,
        updated_at: 1,
        id: "$_id",
      },
    },
    {
      $addFields: {
        currency: "UAH",
        order_id: "$_id",
        totalQty: {
          $sum: "$products.qty",
        },
        totalPrice: {
          $sum: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                $multiply: [
                  { $ifNull: ["$$product.price.current", 0] },
                  "$$product.qty",
                ],
              },
            },
          },
        },
      },
    },
  ];

  const data = await basketModel.aggregate(pipeline);

  return res.status(200).send({ data: data?.[0] || [] });
};

const postBasket = async (req, res, next) => {
  const { productId } = req.body;

  const basket = await basketModel.findOne({ user_id: req.user._id });

  if (basket) {
    const existingProduct = basket.products.find(
      (product) => product.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      basket.products.push({ product: productId, qty: 1 });
    }

    await basket.save();

    return res.status(200).send({ data: basket });
  } else {
    const newBasket = new basketModel({
      user_id: req.user._id,
      products: [{ product: productId, qty: 1 }],
    });

    await newBasket.save();

    return res.status(200).send({ data: newBasket });
  }
};
const putBasket = (req, res, next) => {};

//   const { id } = req.query;

//   const result = await basketModel.updateOne(
//     { user_id: ObjectId(req.user._id) },
//     { $pull: { products: id } }
//   );
//   res.status(200).send({ message: "Wishes was deleted successfuly!" });
// };

const deleteBasket = async (req, res, next) => {
  const { id } = req.query;

  const basket = await basketModel.findOne({ user_id: req.user._id });

  if (basket) {
    // Находим товар с данным ID в корзине
    const productIndex = basket.products.findIndex(
      (product) => product.product.toString() === id
    );

    if (productIndex !== -1) {
      // Если товар найден, уменьшаем значение qty на 1
      basket.products[productIndex].qty -= 1;

      if (basket.products[productIndex].qty <= 0) {
        // Если qty становится меньше или равным 0, удаляем товар из массива
        basket.products.splice(productIndex, 1);
      }

      await basket.save();
    }

    return res
      .status(200)
      .send({ message: "Product was removed from the basket!" });
  } else {
    return res.status(404).send({ message: "Basket not found!" });
  }
};

const changeQty = async (req, res) => {
  const itemId = req.body.id;
  const modifier = req.body.modifier;

  // Найти корзину по пользовательскому идентификатору или создать новую корзину
  let basket = await basketModel.findOne({ user_id: req.user._id });
  if (!basket) {
    basket = new basketModel({ user_id: req.user._id });
  }

  console.log(basket.products, "basket.products");
  // Найти айтем в корзине
  const item = basket.products.find((p) => p.product.equals(itemId));
  if (!item) {
    return res.status(404).send({ message: "Айтем не найден в корзине" });
  }

  // Изменить значение qty в зависимости от модификатора
  if (modifier === "increase") {
    item.qty += 1;
  } else if (modifier === "decrease") {
    item.qty -= 1;
    if (item.qty < 0) {
      item.qty = 0;
    }
  } else {
    return res.status(400).send({ message: "Недопустимый модификатор" });
  }

  // Сохранить изменения в корзине
  await basket.save();

  return res.status(200).send({ message: "Значение qty изменено успешно" });
};

module.exports = {
  getBasketList,
  getBasketListByUser,
  postBasket,
  putBasket,
  deleteBasket,
  changeQty,
};
