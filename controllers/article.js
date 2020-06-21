const express = require("express");
const {
  sanitizePageParams,
  getPageParams,
  sanitizeResourceId,
  tryRequest,
} = require("../middlewares/rest-sanitizer");
const { sanitizeNewArticle } = require("../middlewares/article-sanitizer");
const model = require("../models/article");

const router = express.Router();

router.get(
  "/",
  sanitizePageParams(),
  tryRequest(async (req, res) => {
    // TODO add filters
    const pageParams = getPageParams(req);
    const articles = await model.getArticles(pageParams);
    return res.json(articles);
  })
);

router.post(
  "/",
  sanitizeNewArticle(),
  tryRequest(async (req, res) => {
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
  // TODO allow optional fields and that all authors exist in db
  sanitizeNewArticle(),
  tryRequest(async (req, res) => {
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
