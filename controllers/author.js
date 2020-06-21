const express = require("express");
const {
  sanitizePageParams,
  getPageParams,
  tryRequest,
} = require("../middlewares/rest-sanitizer");
const model = require("../models/author");

const router = express.Router();

router.get(
  "/",
  sanitizePageParams(),
  tryRequest(async (req, res) => {
    // TODO add filters
    const pageParams = getPageParams(req);
    const authors = await model.getAuthors(pageParams);
    return res.json(authors);
  })
);

module.exports = router;
