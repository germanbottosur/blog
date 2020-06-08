const { validationResult } = require("express-validator");

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
  tryRequest: tryRequest,
};
