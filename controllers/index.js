const express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.links({
    articles: "articles/",
    authors: "authors/",
  });

  res.sendStatus(204);
});

module.exports = router;
