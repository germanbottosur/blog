const express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.links({
    // TODO automate base paths
    articles: "/articles",
    authors: "/authors",
  });

  res.sendStatus(204);
});

module.exports = router;
