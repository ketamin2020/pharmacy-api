const { Router } = require("express");

const GroupsControllers = require("./groups.controller");
const asyncWrapper = require("../../utils/asyncWrapper");

const groupRouter = Router();

groupRouter.get("/get", asyncWrapper(GroupsControllers.getGroups));
groupRouter.get("/items", asyncWrapper(GroupsControllers.getGroupsPublic));
groupRouter.post("/create", asyncWrapper(GroupsControllers.postGroup));
groupRouter.put("/update", asyncWrapper(GroupsControllers.putGroup));
groupRouter.delete("/delete", asyncWrapper(GroupsControllers.deleteGroup));

module.exports = groupRouter;
