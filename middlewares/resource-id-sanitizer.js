const { param } = require("express-validator");
const db = require("../db");

// TODO add custom messages
// TODO Enough validations for hex string?
const sanitizeResourceId = () =>
  param("id")
    .isLength({ min: 24, max: 24 })
    .bail()
    .isHexadecimal()
    .bail()
    .customSanitizer((value, context) => db.idFromHex(value));

module.exports = {
  sanitizeResourceId: sanitizeResourceId,
};
