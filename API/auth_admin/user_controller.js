const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError.js");
const userService = require("./user_service.js");
const pick = require("../../utils/pick.js");

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
};

const getUsers = async (req, res) => {
  const filter = pick(req.query, ["first_name"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const result = await userService.queryUsers(filter, options);
  res.send(result);
};

const getUser = async (req, res) => {
  const id = req.query.userId;
  const user = await userService.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
