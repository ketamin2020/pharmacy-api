const propertyModel = require("../properties/properties.model");
const groupsModel = require("../groups/groups.model");
const priceModel = require("../price/price.model");
const instructionModel = require("../instructions/instructions.model");
const imagesModel = require("../images/images.model");
const reviewModel = require("../reviews/reviews.model");
const Novaposhta = require("../../service/novaposhta");

const api = new Novaposhta();

const getDrugsList = async (req, res, next) => {
  const { page, page_size } = req.query;
  const pageNumber = parseInt(page, 10) || 1;
  const pageSize = parseInt(page_size, 10) || 10;
  const skip = (pageNumber - 1) * pageSize;
  const filters = {};

  const pipeline = [
    {
      $match: filters,
    },
    {
      $lookup: {
        from: "prices",
        let: { morion: "$morion" },
        pipeline: [{ $match: { $expr: { $eq: ["$morion", "$$morion"] } } }],
        as: "price",
      },
    },
    {
      $lookup: {
        from: "tradenames",
        let: { name: "$attributes.main.items.marked_name.value" },
        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$name"] } } }],
        as: "marked_name",
      },
    },
    {
      $lookup: {
        from: "images",
        let: { morion: "$morion" },
        pipeline: [{ $match: { $expr: { $eq: ["$morion", "$$morion"] } } }],
        as: "images",
      },
    },
    {
      $lookup: {
        from: "reviews",
        let: { morion: "$morion" },
        pipeline: [{ $match: { $expr: { $eq: ["$morion", "$$morion"] } } }],
        as: "reviews",
      },
    },

    {
      $unwind: "$price",
    },

    {
      $unwind: "$images",
    },
    {
      $unwind: "$marked_name",
    },

    {
      $project: {
        morion: "$morion",
        name: "$name",
        slug: "$slug",
        price: "$price",
        images: "$images",
        marked_name: "$marked_name",
        id: "$_id",
        external_code: "$external_code",
        reviews: "$reviews",
        created_at: "$createdAt",
        updated_at: "$updatedAt",
      },
    },

    {
      $skip: skip,
    },
    {
      $limit: pageSize,
    },
  ];

  const data = await propertyModel.aggregate(pipeline).exec();

  const totalCount = await propertyModel.countDocuments(filters).exec();
  const totalPages = Math.ceil(totalCount / pageSize);

  const meta = {
    current_page: pageNumber,
    page_size: pageSize,
    total_pages: totalPages,
    total_items: totalCount,
  };

  return res.status(200).send({
    meta,
    data,
  });
};

const getMedicinesGroupList = async (req, res, next) => {
  const { main_group } = req.query;
  if (main_group) {
    const children = await groupsModel.find({ slug: main_group });

    const data = children.map((group) => ({
      group_name: group.group_name,
      slug: group.slug,
      children: group.children,
    }));

    return res.status(200).send({ data: data[0] });
  }
};

const getDrugById = async (req, res, next) => {
  if (!req.query.id) return;
  const property = await propertyModel
    .findOne({ _id: req.query.id })
    .populate({
      path: "attributes.main.items.active_ingredient.value",
      model: "Substance",
    })
    .populate({
      path: "attributes.main.items.marked_name.value",
      model: "TradeName",
    })
    .populate({
      path: "attributes.main.items.maker.value",
      model: "Makers",
    })
    .populate({
      path: "attributes.main.items.storage_temperature.value",
      model: "Temperature",
    })
    .populate({
      path: "attributes.main.items.dosage.value",
      model: "Dosage",
    })
    .populate({
      path: "attributes.main.items.quantity.value",
      model: "Quantity",
    })
    .populate({
      path: "attributes.main.items.package.value",
      model: "Package",
    })
    .populate({
      path: "attributes.main.items.administration_route.value",
      model: "AdministrationRoute",
    })
    .populate({
      path: "attributes.main.items.production_form.value",
      model: "Form",
    })
    .select("attributes external_code morion name _id updatedAt ");

  // await property.addView();

  const price = await priceModel
    .findOne({ morion: property.morion })
    .populate("partner")
    .select("current morion partner code previous_price");
  const instruction = await instructionModel
    .findOne({
      morion: property.morion,
    })
    .select("name section -_id");

  const images = await imagesModel
    .findOne({
      morion: property.morion,
    })
    .select("items ");

  // const reviews = await reviewModel
  //   .find({
  //     property: req.query.id,
  //   })
  //   .select("rate");
  // const rating = reviews.reduce((acc, item) => (acc += +item.rate), 0);

  const prepareImages = images.items.filter((item) => !!item.id);

  return res.status(200).send({
    property: {
      id: req.query.id,
      main: property.attributes.main,
      warnings: property.attributes.warnings,
    },
    price,
    instruction,
    images: prepareImages,
    partner: price.partner,
    morion: property.morion,
    name: property.name,
    external_code: property.external_code,
    // reviews: {
    //   count: reviews.length,
    //   rating: (rating / reviews.length).toFixed(1),
    // },
  });
};

const searchByCityName = async (req, res, next) => {
  try {
    await api.api_search_by_address(
      req.query.search,
      req.query.limit,
      req.query.page,
      (data) => {
        const parsedData = JSON.parse(data);
        const prepareData = parsedData.data;
        if (!!prepareData?.length) {
          const [cityRes] = prepareData;
          return res
            .status(200)
            .send({ count: cityRes?.TotalCount, cities: cityRes?.Addresses });
        }
        return res.status(200).send({ count: 0, cities: [] });
      },
      (error, response) => {
        return res.status(500).send(error);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
};

const searchByWerehouse = async (req, res, next) => {
  try {
    await api.api_search_by_werehouse(
      req.query.search,
      req.query.limit,
      req.query.page,
      req.query.city_ref,
      (data) => {
        const parsedData = JSON.parse(data);
        const prepareData = parsedData.data;
        return res
          .status(200)
          .send({ werehouses: prepareData, count: parsedData.info.totalCount });
      },
      (error, response) => {
        return res.status(500).send(error);
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getDrugsList,
  getDrugById,
  getMedicinesGroupList,
  searchByCityName,
  searchByWerehouse,
};
