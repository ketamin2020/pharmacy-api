const { Router } = require("express");

const GroupsControllers = require("./groups.controller");
const asyncWrapper = require("../../utils/asyncWrapper");
const authHiddleware = require("../middlewares/authorization.js");

const groupRouter = Router();

groupRouter.get(
  "/get",

  asyncWrapper(GroupsControllers.getGroups)
);
groupRouter.get(
  "/items",

  asyncWrapper(GroupsControllers.getGroupsPublic)
);
groupRouter.post(
  "/create",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(GroupsControllers.postGroup)
);
groupRouter.put(
  "/update",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(GroupsControllers.putGroup)
);
groupRouter.delete(
  "/delete",
  asyncWrapper(authHiddleware.withAuth),
  asyncWrapper(GroupsControllers.deleteGroup)
);

module.exports = groupRouter;
