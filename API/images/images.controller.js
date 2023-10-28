const imagesModel = require("./images.model");
const pick = require("../../utils/pick.js");
const getImages = async (req, res, next) => {
  const filter = pick(req.query, ["morion", "id", "created_at", "updated_at"]);
  const options = pick(req.query, ["order", "sort_field", "per_page", "page"]);

  const data = await imagesModel.paginate(filter, options);
  return res.status(200).send({ data });
};
const postImages = async (req, res, next) => {
  const images = new imagesModel(req.body);
  const newImages = await images.save();
  return res.status(200).send({ data: newImages });
};
const putImages = async (req, res, next) => {
  await imagesModel.findOneAndUpdate({ _id: req.body.id }, { ...req.body });
  return res.status(200).send({ message: "Images was updated successfuly!" });
};
const deleteImages = async (req, res, next) => {
  const { id, image_id } = req.query;
  if (!id)
    return res
      .status(404)
      .send({ id: "id is required", message: httpStatus["404_MESSAGE"] });
  if (id && !image_id) {
    await imagesModel.deleteOne({ _id: id });
    return res.status(200).send({ message: "Images was deleted successfuly!" });
  }
  if (id && image_id) {
    await imagesModel.findOneAndUpdate(
      { _id: id, "items.id": image_id },
      {
        $set: {
          "items.$.id": 0,
          "items.$.url": "",
        },
      }
    );

    return res.status(200).send({ message: "Image was deleted successfuly!" });
  }
};

module.exports = { getImages, postImages, putImages, deleteImages };
