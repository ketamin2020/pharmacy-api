const Joi = require("joi");

const { password, objectId } = require("./custom_validation.js");

const createUser = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    title: Joi.string().allow(null),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    status: Joi.number().allow(null),
    address: Joi.string().allow(null),
    position: Joi.string().allow(null),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    per_page: Joi.number().integer(),
    sort_field: Joi.string().allow(null),
    order: Joi.string().allow(null),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required().email(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
