var _ = require("lodash/core");
const validator = require("validator");
const db = require("../db");

const isNotEmptyString = (value) =>
  _.isString(value) && !validator.isEmpty(value, { ignore_whitespace: true });

const isResourceIdString = (value) =>
  isNotEmptyString(value) &&
  validator.isLength(value, { min: 24, max: 24 }) &&
  validator.isHexadecimal(value);

const parseResourceId = (value) => db.idFromHex(value);

module.exports = {
  isNotEmptyString: isNotEmptyString,
  isResourceIdString: isResourceIdString,
  parseResourceId: parseResourceId,
};
