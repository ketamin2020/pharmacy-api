const { Router } = require("express");

const validate = require("../../midelwares/validate.js");
const validation = require("../../validation/user_admin_validation.js");

const userController = require("./user_controller.js");
const { catchAsync } = require("../../utils/catchAsync.js");

const authHiddleware = require("../middlewares/authorization.js");

const user_router = Router();

const UserRoutes = {
  CREATE: "/admin-create",
  GET_LIST: "/admin-users-list",
  GET_USER_BY_ID: "/admin-user",
  UPDATE: "/admin-update",
  DELETE: "/admin-delete",
};

user_router.post(
  UserRoutes.CREATE,
  // catchAsync(authHiddleware.withAuth),
  validate(validation.createUser),
  catchAsync(userController.createUser)
);

user_router.get(
  UserRoutes.GET_LIST,
  catchAsync(authHiddleware.withAuth),
  validate(validation.getUsers),
  catchAsync(userController.getUsers)
);
user_router.get(
  UserRoutes.GET_USER_BY_ID,
  catchAsync(authHiddleware.withAuth),
  validate(validation.getUser),
  catchAsync(userController.getUser)
);

user_router.put(
  UserRoutes.UPDATE,
  catchAsync(authHiddleware.withAuth),
  validate(validation.updateUser),
  catchAsync(userController.updateUser)
);

user_router.delete(
  UserRoutes.DELETE,
  catchAsync(authHiddleware.withAuth),
  validate(validation.updateUser),
  catchAsync(userController.deleteUser)
);

module.exports = user_router;
