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
