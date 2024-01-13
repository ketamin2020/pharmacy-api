const propertyModel = require("../properties/properties.model");
const groupsModel = require("../groups/groups.model");
const priceModel = require("../price/price.model");
const instructionModel = require("../instructions/instructions.model");
const imagesModel = require("../images/images.model");
const reviewModel = require("../reviews/reviews.model");
const Novaposhta = require("../../service/novaposhta");
const mongoose = require("mongoose");
const api = new Novaposhta();

const getDrugsList = async (req, res, next) => {
  const {
    main_group,
    first_lavel,
    second_level,
    page = 1,
    pageSize = 10,
    ...params
  } = req.query;

  const filters = {
    "attributes.main.items.groups.main_group.slug": main_group,
  };

  const queryFilter = {
    "attributes.main.items.groups.main_group.slug": main_group,
  };

  if (first_lavel) {
    filters[
      "attributes.main.items.groups.first_lavel_group.slug"
    ] = first_lavel;
    queryFilter[
      "attributes.main.items.groups.first_lavel_group.slug"
    ] = first_lavel;
  }
  if (second_level) {
    filters[
      "attributes.main.items.groups.second_lavel_group.slug"
    ] = second_level;

    queryFilter[
      "attributes.main.items.groups.second_lavel_group.slug"
    ] = second_level;
  }

  const skip = (page - 1) * pageSize;

  const filter = {
    slug: main_group,
  };

  if (first_lavel) {
    filter.children = {
      $elemMatch: {
        slug: first_lavel,
      },
    };
  }

  const group = await groupsModel
    .findOne(filter, first_lavel && { "children.$": 1 })
    .lean();

  for (const key in params) {
    if (Array.isArray(params[key]) && params[key].length > 0) {
      queryFilter[`attributes.main.items.${key}.value`] = {
        $in: params[key].map((id) => mongoose.Types.ObjectId(id)),
      };
    }
  }

  const pipeline = [
    {
      $match: queryFilter,
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
      $unwind: {
        path: "$reviews",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $unwind: {
        path: "$price",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $unwind: {
        path: "$images",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $unwind: {
        path: "$marked_name",
        preserveNullAndEmptyArrays: true,
      },
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
      },
    },
  ];

  pipeline.push({ $skip: skip }, { $limit: pageSize });

  const pipelineTradeName = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.marked_name.value",
        count: { $sum: 1 },
        title: { $first: "$items.name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "tradenames",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name",
        count: "$count",
      },
    },
  ];
  const pipelineSubstance = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.active_ingredient.value",
        count: { $sum: 1 },
        title: { $first: "$items.name_ua" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "substances",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name_ua",
        count: "$count",
      },
    },
  ];
  const pipelineMakers = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.maker.value",
        count: { $sum: 1 },
        title: { $first: "$items.full_name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "makers",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.full_name",
        count: "$count",
      },
    },
  ];
  const pipelineDosage = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.dosage.value",
        count: { $sum: 1 },
        title: { $first: "$items.name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "dosages",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name",
        count: "$count",
      },
    },
  ];
  const pipelineForms = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.production_form.value",
        count: { $sum: 1 },
        title: { $first: "$items.name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "forms",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name",
        count: "$count",
      },
    },
  ];
  const pipelineRoute = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.administration_route.value",
        count: { $sum: 1 },
        title: { $first: "$items.name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "administrationroutes",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name",
        count: "$count",
      },
    },
  ];
  const pipelineQty = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.quantity.value",
        count: { $sum: 1 },
        title: { $first: "$items.name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "quantities",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name",
        count: "$count",
      },
    },
  ];
  const pipelineTemperature = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.storage_temperature.value",
        count: { $sum: 1 },
        title: { $first: "$items.name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "temperatures",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name",
        count: "$count",
      },
    },
  ];
  const pipelinePackages = [
    {
      $match: filters,
    },
    {
      $group: {
        _id: "$attributes.main.items.package.value",
        count: { $sum: 1 },
        title: { $first: "$items.name" },
      },
    },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: "packages",
        localField: "_id",
        foreignField: "_id",
        as: "item",
      },
    },
    {
      $unwind: "$item",
    },
    {
      $project: {
        _id: 0,
        id: "$item._id",
        name: "$item.name",
        count: "$count",
      },
    },
  ];

  const pipelineWarnings = [
    {
      $match: filters,
    },
    {
      $project: {
        warnings: { $objectToArray: "$attributes.warnings.items" },
      },
    },
    {
      $unwind: "$warnings",
    },
    {
      $group: {
        _id: "$warnings.v",
        count: { $sum: 1 },
        title: { $first: "$warnings.v.title" },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        title: 1,
        value: "$_id",
      },
    },
  ];
  const pipelineImported = [
    {
      $match: filters,
    },
    { $unwind: "$attributes.main.items" },
    {
      $group: {
        _id: { importedValue: "$attributes.main.items.imported.value" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.importedValue",
        count: 1,
      },
    },
  ];

  const data = await propertyModel.aggregate(pipeline).exec();
  const trade_name = await propertyModel.aggregate(pipelineTradeName).exec();
  const makers = await propertyModel.aggregate(pipelineMakers).exec();
  const substances = await propertyModel.aggregate(pipelineSubstance).exec();
  const dosages = await propertyModel.aggregate(pipelineDosage).exec();
  const forms = await propertyModel.aggregate(pipelineForms).exec();
  const route = await propertyModel.aggregate(pipelineRoute).exec();
  const quantity = await propertyModel.aggregate(pipelineQty).exec();
  const temperature = await propertyModel.aggregate(pipelineTemperature).exec();
  const packages = await propertyModel.aggregate(pipelinePackages).exec();
  const warnings = await propertyModel.aggregate(pipelineWarnings);
  const imported = await propertyModel.aggregate(pipelineImported);

  return res.status(200).send({
    data,
    group,
    pagination: {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    },
    properties: {
      trade_name,
      substances,
      makers,
      dosages,
      forms,
      route,
      quantity,
      temperature,
      packages,
      warnings,
      imported,
    },
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

  const price = await priceModel
    .findOne({ morion: property.morion })
    .populate("partner")
    .select("current morion partner code previous_price");

  const instruction = await instructionModel
    .findOne({
      morion: property.morion,
    })
    .select("name section");

  const images = await imagesModel.findOne({
    morion: property.morion,
  });

  const reviews = await reviewModel
    .find({
      property: req.query.id,
    })
    .select("rate");

  const rating = reviews.reduce((acc, item) => (acc += +item.rate), 0);

  const prepareImages = images?.items?.filter((item) => !!item.id);

  await property.addView();

  return res.status(200).send({
    property: {
      id: req.query.id,
      main: property.attributes.main,
      warnings: property.attributes.warnings,
    },
    price,
    instruction,
    images: prepareImages,
    partner: price?.partner,
    morion: property?.morion,
    name: property?.name,
    external_code: property?.external_code,
    reviews: {
      count: reviews?.length,
      rating: (rating / reviews?.length).toFixed(1),
    },
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

const getDrugByActiveIngridient = async (req, res, next) => {
  try {
    const activeIngredientId = req.query.active_ingredient;

    if (!activeIngredientId) {
      return res
        .status(400)
        .json({ error: "Параметр active_ingredient не был предоставлен." });
    }

    const pipeline = [
      {
        $match: {
          "attributes.main.items.active_ingredient.value": mongoose.Types.ObjectId(
            activeIngredientId
          ),
        },
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
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$price",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$images",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$marked_name",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          morion: "$morion",
          name: "$name",
          slug: "$slug",
          price: { $ifNull: ["$price", null] },
          images: { $ifNull: ["$images", null] },
          marked_name: { $ifNull: ["$marked_name", null] },

          external_code: "$external_code",
          reviews: { $ifNull: ["$reviews", null] },
          id: { $toString: "$_id" },
        },
      },

      { $limit: 20 },
    ];

    const data = await propertyModel.aggregate(pipeline).exec();

    res.status(200).json(data);
  } catch (error) {
    console.error("Ошибка при поиске препаратов:", error);
    res.status(500).json({ error: "Произошла ошибка на сервере." });
  }
};

const getDrugsByViews = async (req, res, next) => {
  try {
    const pipeline = [
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
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$price",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$images",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $unwind: {
          path: "$marked_name",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          morion: "$morion",
          name: "$name",
          slug: "$slug",
          price: { $ifNull: ["$price", null] },
          images: { $ifNull: ["$images", null] },
          marked_name: { $ifNull: ["$marked_name", null] },

          external_code: "$external_code",
          reviews: { $ifNull: ["$reviews", null] },
          id: { $toString: "$_id" },
        },
      },

      {
        $sort: {
          views: -1,
        },
      },

      { $limit: 20 },
    ];

    const data = await propertyModel.aggregate(pipeline).exec();

    res.status(200).json(data);
  } catch (error) {
    console.error("Ошибка при поиске препаратов:", error);
    res.status(500).json({ error: "Произошла ошибка на сервере." });
  }
};

module.exports = {
  getDrugsList,
  getDrugById,
  getMedicinesGroupList,
  searchByCityName,
  searchByWerehouse,
  getDrugByActiveIngridient,
  getDrugsByViews,
};
