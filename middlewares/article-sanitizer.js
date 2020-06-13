const { body } = require("express-validator");
const { isNotEmptyString } = require("./sanitizer");
const { isResourceId, sanitizeResourceId } = require("./resource-id-sanitizer");

const areResourceIds = (value) => value.every(isResourceId);
const sanitizeResourceIds = (value) => value.map(sanitizeResourceId);

// TODO validate that all authors exist in db
const sanitizeNewArticle = () => [
  body("title").custom(isNotEmptyString).bail().trim(),
  body("short_description").custom(isNotEmptyString).bail().trim(),
  body("long_description").custom(isNotEmptyString).bail().trim(),
  body("authors")
    .isArray({ min: 1 })
    .bail()
    .custom(areResourceIds)
    .bail()
    .customSanitizer(sanitizeResourceIds),
];

module.exports = {
  sanitizeNewArticle: sanitizeNewArticle,
};
