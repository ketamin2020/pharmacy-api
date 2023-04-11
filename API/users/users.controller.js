const httpStatus = require("http-status");
const usersModel = require("./users.model");
const getUser = async (req, res, next) => {
  const user = await usersModel
    .findById(req.user._id)
    .select("about first_name last_name middle_name ")
    .lean();
  if (!user) return res.status(404).send({ data: "User not found" });
  user.id = user._id;
  delete user._id;
  return res.status(200).send({ data: user });
};
const putUser = async (req, res, next) => {
  const { id } = req.body;

  const updatedUser = await usersModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .lean()
    .select("about  first_name last_name middle_name ");

  updatedUser.id = updatedUser._id;
  delete updatedUser._id;
  return res.status(200).send({ data: updatedUser });
};
const deleteUser = async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  await workerModel.deleteOne({ _id: id });
  res.status(200).send({ message: "Workers was deleted successfuly!" });
};

module.exports = {
  getUser,
  putUser,
  deleteUser,
};
