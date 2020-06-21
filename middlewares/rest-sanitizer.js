const { query, param, validationResult } = require("express-validator");
const { isResourceIdString, parseResourceId } = require("./sanitizer-utils");

const defaultPageSize = parseInt(process.env.DEFAULT_PAGE_SIZE || "10");
const maxPageSize = parseInt(process.env.MAX_PAGE_SIZE || "100");

const sanitizePageParams = () => [
  query("page").optional().isInt({ min: 0 }).bail().toInt(),
  query("size").optional().isInt({ min: 1, max: maxPageSize }).bail().toInt(),
];

const sanitizeResourceId = () =>
  param("id")
    .custom(isResourceIdString)
    .bail()
    .customSanitizer(parseResourceId);

const getPageParams = (req) => ({
  page: req.query.page || 0,
  size: req.query.size || defaultPageSize,
});

const tryRequest = (processor) => {
  return async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        return await processor(req, res);
      } catch (err) {
        return next(err);
      }
    } else {
      // TODO improve error response
      return res.status(422).json({ errors: errors.array() });
    }
  };
};

module.exports = {
  sanitizePageParams: sanitizePageParams,
  sanitizeResourceId: sanitizeResourceId,
  getPageParams: getPageParams,
  tryRequest: tryRequest,
};
