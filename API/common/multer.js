const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
});
const multerInstance = multer({ storage });

module.exports = multerInstance;
