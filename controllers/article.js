const express = require("express");
const { sanitizeResourceId } = require("../middlewares/resource-id-sanitizer");
const { tryRequest } = require("../middlewares/request-validator");
const model = require("../models/article");
const router = express.Router();

router.get(
  "/",
  tryRequest(async (req, res) => {
    // TODO add filters
    // TODO add pagination
    const articles = await model.getArticles();
    return res.json(articles);
  })
);

router.post(
  "/",
  tryRequest(async (req, res) => {
    // TODO sanitize and validate authors
    const data = req.body;
    const articleId = await model.addArticle(data);
    res.links({
      // TODO automate base paths
      article: `/articles/${articleId}`,
    });

    return res.sendStatus(201);
  })
);

router.get(
  "/:id",
  sanitizeResourceId(),
  tryRequest(async (req, res) => {
    const article = await model.getArticle(req.params.id);

    if (article != null) {
      return res.json(article);
    } else {
      return res.sendStatus(404);
    }
  })
);

router.patch(
  "/:id",
  sanitizeResourceId(),
  tryRequest(async (req, res) => {
    // TODO sanitize body and validate authors
    const updated = await model.updateArticle(req.params.id, req.body);
    const status = updated ? 204 : 404;

    return res.sendStatus(status);
  })
);

router.delete(
  "/:id",
  sanitizeResourceId(),
  tryRequest(async (req, res) => {
    const deleted = await model.deleteArticle(req.params.id);
    const status = deleted ? 204 : 404;

    return res.sendStatus(status);
  })
);

module.exports = router;
