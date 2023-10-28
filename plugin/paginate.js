const moment = require("moment");

const defaultSorter = "created_at";

const Sorter = {
  ASC: "asc",
  DESC: "desc",
};

const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    const sort = {};

    if (options.sort_field) {
      sort[options.sort_field] = options.order === Sorter.DESC ? -1 : 1;
    } else {
      sort[defaultSorter] = -1;
    }

    if (filter["created_at"]) {
      const dateRange = Array.isArray(filter["created_at"])
        ? filter["created_at"][0]
        : filter["created_at"];
      if (typeof dateRange === "string") {
        const [startStr, endStr] = dateRange.split("|");
        const startDate = moment(startStr, "DD/MM/YYYY");
        const endDate = moment(endStr, "DD/MM/YYYY");

        if (!endStr && startStr) {
          sort["createdAt"] = startDate === Sorter.DESC ? -1 : 1;
          delete filter["created_at"];
          filter["createdAt"] = {
            $gte: startDate.toDate(),
            $lte: startDate.add(1, "day").toDate(),
          };
        } else {
          if (startDate.isValid() && endDate.isValid()) {
            sort["createdAt"] = startDate === Sorter.DESC ? -1 : 1;
            delete filter["created_at"];
            filter["createdAt"] = {
              $gte: startDate.toDate(),
              $lte: endDate.toDate(),
            };
          }
        }
      }
    }

    if (filter["updated_at"]) {
      const dateRange = Array.isArray(filter["updated_at"])
        ? filter["updated_at"][0]
        : filter["updated_at"];
      if (typeof dateRange === "string") {
        const [startStr, endStr] = dateRange.split("|");
        const startDate = moment(startStr, "DD/MM/YYYY");
        const endDate = moment(endStr, "DD/MM/YYYY");

        if (!endStr && startStr) {
          sort["updatedAt"] = startDate === Sorter.DESC ? -1 : 1;
          delete filter["updated_at"];
          filter["updatedAt"] = {
            $gte: startDate.toDate(),
            $lte: startDate.add(1, "day").toDate(),
          };
        } else {
          if (startDate.isValid() && endDate.isValid()) {
            sort["updatedAt"] = startDate === Sorter.DESC ? -1 : 1;
            delete filter["updated_at"];
            filter["updatedAt"] = {
              $gte: startDate.toDate(),
              $lte: endDate.toDate(),
            };
          }
        }
      }
    }

    const limit =
      options.per_page && parseInt(options.per_page, 10) > 0
        ? parseInt(options.per_page, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(",").forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split(".")
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }), "")
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const meta = {
        current: page,
        pageSize: limit,
        total: totalResults,
        totalPages,
      };
      const result = {
        data: results,
        meta,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = { paginate };
