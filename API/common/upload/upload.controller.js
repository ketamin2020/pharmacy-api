function uploadSingleImage(req, res) {
  const file = req.file;
  console.log(file, "file");
  res.send("file", file);
}

module.exports = { uploadSingleImage };
