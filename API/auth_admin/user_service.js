const httpStatus = require("http-status");
const User = require("./user_model");

const ApiError = require("../../utils/ApiError");

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody?.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  const passwordHash = await User.brcPassHash(userBody.password);

  return User.create({ ...userBody, password: passwordHash });
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  const u = await User.find({});
  console.log(u, "users");
  return await User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
