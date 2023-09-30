const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error("any.invalid");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error("any.invalid");
  }
  return value;
};

module.exports = { objectId, password };
