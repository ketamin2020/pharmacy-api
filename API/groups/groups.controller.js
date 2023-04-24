const groupsModel = require("./groups.model");
const slugify = require("slugify");
const {
  Types: { ObjectId },
} = require("mongoose");
const { findById } = require("./groups.model");
const httpStatus = require("http-status");
const getGroups = async (req, res, next) => {
  const allGroups = await groupsModel.find({});
  const groups = allGroups.reduce((list, group) => {
    list.push({
      id: group._id,
      slug: group.slug,
      group_name: group.group_name,
      group_image: group?.group_image || "",
      children: group.children,
    });
    return list;
  }, []);
  return res.status(200).send({ data: groups });
};
const getGroupsPublic = async (req, res, next) => {
  const allGroups = await groupsModel.find({});
  const groups = allGroups.reduce((list, group) => {
    list.push({
      id: group._id,
      slug: group.slug,
      group_name: group.group_name,
      group_image: group.group_image,
      children: group.children,
    });
    return list;
  }, []);
  return res.status(200).send({ data: groups });
};
const postGroup = async (req, res, next) => {
  const { level, parent_id } = req.body;
  const slug = slugify(req.body.group_name, {
    replacement: "-",
    lower: true,
  });
  if (level === 0) {
    const group = new groupsModel({ ...req.body });
    await group.save();
    return res.status(200).send({ message: httpStatus[200] });
  }
  if (level === 1) {
    await groupsModel.findByIdAndUpdate(
      { _id: parent_id },
      {
        $push: {
          children: {
            ...req.body,
            group_image: req.body.group_image,
            slug,
            id: ObjectId().toHexString(),
            children: [],
          },
        },
      }
    );

    return res.status(200).send({ message: httpStatus[200] });
  }
  if (level === 2) {
    await groupsModel.findByIdAndUpdate(
      { _id: parent_id },
      {
        $push: {
          "children.$[elem].children": {
            ...req.body,
            group_image: req.body.group_image,
            slug,
            id: ObjectId().toHexString(),
          },
        },
      },
      { arrayFilters: [{ "elem.id": req.body.child_id }] }
    );

    return res.status(200).send({ message: httpStatus[200] });
  }
};
const putGroup = async (req, res, next) => {
  const { id, level, parent_id } = req.body;
  const slug = slugify(req.body.group_name, {
    replacement: "-",
    lower: true,
  });
  if (level === 0) {
    await groupsModel.findByIdAndUpdate({ _id: id }, { ...req.body, slug });

    return res.status(200).send({ message: httpStatus[200] });
  }
  if (level === 1) {
    await groupsModel.updateOne(
      {
        children: { $elemMatch: { id: id } },
      },
      {
        $set: {
          "children.$.group_name": req.body.group_name,
          "children.$.slug": slug,
          "children.$.group_image": req.body?.group_image,
        },
      }
    );

    return res.status(200).send({ message: httpStatus[200] });
  }
  if (level === 2) {
    await groupsModel.findByIdAndUpdate(
      {
        _id: parent_id,
      },
      {
        $set: {
          "children.$[i].children.$[j].group_name": req.body.group_name,
          "children.$[i].children.$[j].slug": slug,
          "children.$[i].children.$[j].group_image": req.body?.group_image,
        },
      },
      {
        arrayFilters: [
          {
            "j.id": id,
          },
          {
            "i.id": parent_id,
          },
        ],
      }
    );

    return res.status(200).send({ message: httpStatus[200] });
  }
};
const deleteGroup = async (req, res, next) => {
  const { id, level, parent_id } = req.query;

  if (!id)
    return res
      .status(404)
      .send({ id: "field is required", message: httpStatus["404_MESSAGE"] });
  if (level === "0") {
    await groupsModel.deleteOne({ _id: id });
    res.status(200).send({ message: httpStatus[200] });
  }
  if (level === "1") {
    await groupsModel.findByIdAndUpdate(
      { _id: parent_id },
      { $pull: { children: { id } } },
      { safe: true, multi: false }
    );

    res.status(200).send({ message: httpStatus[200] });
  }
  if (level === "2") {
    await groupsModel.findByIdAndUpdate(
      { _id: parent_id },
      { $pull: { "children.$[].children": { id } } },
      { safe: true, multi: false }
    );

    res.status(200).send({ message: httpStatus[200] });
  }
};

module.exports = {
  getGroups,
  postGroup,
  putGroup,
  deleteGroup,
  getGroupsPublic,
};
