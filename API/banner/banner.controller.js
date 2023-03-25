const bannerModel = require("./banner.model");

const getBanners = async (req, res, next) => {
  const banners = await bannerModel.find({});

  const arr = banners.reduce((acc, item) => {
    acc.push({
      id: item._id,
      link: item.link,
      createdAt: item.createdAt,
      link_id: item.id,
    });
    return acc;
  }, []);

  return res.status(200).send({ data: arr });
};
const postBanner = async (req, res, next) => {
  const newItem = await new bannerModel(req.body);
  await newItem.save();
  return res.status(200).send({ data: newItem });
};
const deleteBanner = async (req, res, next) => {
  const { id } = req.query;
  await bannerModel.findOneAndDelete({ _id: id });
  return res.status(200).send({ message: "Image was deleted successfuly!" });
};

module.exports = { getBanners, postBanner, deleteBanner };
