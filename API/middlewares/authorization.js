const jwt = require("jsonwebtoken");
const userModel = require("../auth_admin/user_model");
const userModelPub = require("../users/users.model");
const { UnauthorizedError } = require("../../helpers/error.helpers");

const withAuth = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    const [_, token] = header.split(" ");

    const userId = jwt.verify(token, process.env.JWT_SECRET).sub;

    const userPubId = jwt.verify(token, process.env.JWT_SECRET).id;

    let user = null;

    if (userId) {
      user = await userModel.findById(userPubId);
    } else {
      user = await userModelPub.findById(userPubId);
    }

    if (!user) {
      throw new Error();
    }

    req.user = user;
  } catch (error) {
    next(new UnauthorizedError("Authorization failed"));
  }

  next();
};

module.exports = { withAuth };
