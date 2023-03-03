const workerModel = require("./worker.model");
const slugify = require("slugify");
const getWorkers = async (req, res, next) => {
  const allWorkers = await workerModel.find({});

  const workersList = allWorkers.reduce((list, worker) => {
    list.push({
      id: worker._id,
      first_name: worker.first_name,
      last_name: worker.last_name,
      full_address: worker.full_address,
      phone: worker.phone,
      email: worker.email,
      position: worker.position,
    });
    return list;
  }, []);
  return res.status(200).send({ data: workersList });
};
const postWorker = async (req, res, next) => {
  const { first_name } = req.body;
  // const slug = slugify(first_name, {
  //   replacement: "-", // replace spaces with replacement character, defaults to `-`
  //   lower: true, // convert to lower case, defaults to `false`
  // });

  const worker = new workerModel({ ...req.body });
  const newBrand = await worker.save();
  return res.status(200).send({ data: newBrand });
};
const putWorker = (req, res, next) => {};
const deleteWorker = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await workerModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Partner was deleted successfuly!" });
};

module.exports = { getWorkers, postWorker, putWorker, deleteWorker };
