const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const uploadFile = async (req, res) => {
  const response = await uploadFile(req.file);
  await unlinkFile(req.file.path);
  res.status(200).send({ response });
};

const getFile = async (req, res) => {
  const key = req.params.key;
};

const deleteFile = async (req, res) => {
  const id = req.params.id;
};

module.exports = { uploadFile, deleteFile };
