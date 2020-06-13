var _ = require("lodash/core");
const validator = require("validator");

const isNotEmptyString = (value) =>
  _.isString(value) && !validator.isEmpty(value, { ignore_whitespace: true });

module.exports = {
  isNotEmptyString: isNotEmptyString,
};
