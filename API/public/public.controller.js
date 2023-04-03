const propertyModel = require("../properties/properties.model");

const getDrugsList = async (req, res, next) => {
  const { main_group, first_lavel, second_level } = req.query;

  const filters = {
    "attributes.main.items.groups.main_group.slug": main_group,
  };

  if (first_lavel) {
    filters[
      "attributes.main.items.groups.first_lavel_group.slug"
    ] = first_lavel;
  }
  if (second_level) {
    filters[
      "attributes.main.items.groups.second_lavel_group.slug"
    ] = second_level;
  }

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
        price: "$price",
        images: "$images",
        marked_name: "$marked_name",
        id: "$_id",
      },
    },
  ];

  const pipelineTradeName = [
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

  return res.status(200).send({
    data,
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
    },
  });
};

module.exports = { getDrugsList };

//AS VARIANT
// const pipelineSearch = [
//   {
//     $group: {
//       _id: "$attributes.main.items.marked_name.value",
//       count: { $sum: 1 },
//       title: { $first: "$items.name" },
//     },
//   },
//   { $sort: { count: -1 } },

//   {
//     $group: {
//       _id: null,
//       items: { $push: "$_id" },
//       values: {
//         $push: {
//           title: "$item.name",
//           value: "$_id",
//           count: "$count",
//         },
//       },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       items: 1,
//       values: 1,
//     },
//   },
//   {
//     $lookup: {
//       from: "tradenames",
//       localField: "items",
//       foreignField: "_id",
//       as: "items",
//     },
//   },
// ];