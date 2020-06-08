const express = require("express");
const { tryRequest } = require("../middlewares/request-validator");
const model = require("../models/author");

const router = express.Router();

router.get(
  "/",
  tryRequest(async (req, res) => {
    // TODO add pagination
    const authors = await model.getAuthors();
    return res.json(authors);
  })
);

module.exports = router;
