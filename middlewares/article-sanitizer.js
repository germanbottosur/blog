const { body } = require("express-validator");
const {
  isNotEmptyString,
  isResourceIdString,
  parseResourceId,
} = require("./sanitizer-utils");

// TODO validate that all authors exist in db
const sanitizeNewArticle = () => [
  body("title").custom(isNotEmptyString).bail().trim(),
  body("short_description").custom(isNotEmptyString).bail().trim(),
  body("long_description").custom(isNotEmptyString).bail().trim(),
  body("authors")
    .isArray({ min: 1 })
    .bail()
    .custom((array) => array.every(isResourceIdString))
    .bail()
    .customSanitizer((array) => array.map(parseResourceId)),
];

module.exports = {
  sanitizeNewArticle: sanitizeNewArticle,
};
