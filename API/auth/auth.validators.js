const Joi = require("joi");

const loginSchema = Joi.object({
  phone: Joi.string().min(10).required(),
});

// const loginSchema = Joi.object({
//   email: Joi.string().min(6).email().required(),
//   password: Joi.string().min(8).required(),
// });

module.exports = {
  loginSchema,
};
