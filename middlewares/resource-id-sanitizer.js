var _ = require("lodash/core");
const validator = require("validator");
const db = require("../db");

const isResourceId = (value) =>
  _.isString(value) &&
  validator.isLength(value, { min: 24, max: 24 }) &&
  validator.isHexadecimal(value);

const sanitizeResourceId = (value) => db.idFromHex(value);

module.exports = {
  isResourceId: isResourceId,
  sanitizeResourceId: sanitizeResourceId,
};
