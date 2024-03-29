const workerModel = require("./worker.model");
const userModel = require("../users/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const pick = require("../../utils/pick.js");

const getWorkers = async (req, res, next) => {
  const filter = pick(req.query, [
    "first_name",
    "last_name",
    "full_address",
    "phone",
    "email",
    "slug",
    "position",
    "created_at",
    "updated_at",
  ]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const allWorkers = await workerModel.paginate(filter, options);

  return res.status(200).send({ data: allWorkers });
};
const postWorker = async (req, res, next) => {
  const { password } = req.body;
  if (!password)
    return res
      .status(404)
      .send({ id: "password is required", message: httpStatus["404_MESSAGE"] });

  const hashPassword = await bcrypt.hash(password, 3);
  const worker = new workerModel({ ...req.body, password: hashPassword });
  const newWorker = await worker.save();
  return res.status(200).send({ data: newWorker });
};
const putWorker = (req, res, next) => {};
const deleteWorker = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await workerModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Workers was deleted successfuly!" });
};

const loginWorker = async (req, res, next) => {
  const { email, password, phone } = req.body;
  const worker = await userModel.findOne({ phone });
  if (!worker)
    return res.status(401).json({
      message: httpStatus.UNAUTHORIZED,
    });
  const token = jwt.sign({ id: worker._id }, process.env.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  if (worker) {
    const isPassValid = await bcrypt.compare(password, worker.password);

    if (isPassValid) {
      return res.status(201).json({
        token,
        id: worker._id,
        admin: true,
        role: worker.position,
      });
    } else {
      return res.status(401).json({
        message: httpStatus.UNAUTHORIZED,
      });
    }
  }
};

module.exports = {
  getWorkers,
  postWorker,
  putWorker,
  deleteWorker,
  loginWorker,
};
