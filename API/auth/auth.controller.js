const authModel = require("../../API/users/users.model");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

async function userLogin(req, res) {
  const { phone } = req.body;
  const user = await authModel.findOne({ phone });

  const token = jwt.sign({ id: phone }, process.env.JWT_SECRET, {
    expiresIn: 30 * 24 * 60 * 60,
  });

  if (user) {
    return res.status(201).json({
      message: httpStatus.CREATED,
      token,
      admin: user.admin,
    });
  }

  const auth = new authModel({
    phone,
    admin: false,
  });

  await auth.save();

  return res.status(201).json({
    token,
    message: httpStatus.CREATED,
    admin: auth.admin,
  });
}

// async function userLogin(req, res) {
//   const { email, password } = req.body;

//   const user = await userModel.userByEmail(email);
//   if (!user) {
//     throw new UnauthorizedError("Wrong credentials");
//   }

//   if (user.verificationToken !== null) {
//     throw new UnauthorizedError("Email is not verified!");
//   }

//   const token = await user.checkUser(password);

//   return res.status(200).json({
//     token,
//     user: {
//       id: user._id,
//       email: user.email,
//     },
//   });
// }

async function userLogout(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ message: "Not found" });
  }
  const userToBeLoguot = await user.updateToken("");
  if (!userToBeLoguot) {
    return res.status(400).json({ message: "Not found" });
  }

  return res.status(204).end();
}

module.exports = {
  userLogin,
  userLogout,
};
