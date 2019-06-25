const express = require("express");
const model = require("../models/article");

const router = express.Router();

const getArticles = async (req, res, next) => {
  // TODO add filters
  // TODO add pagination
  try {
    const articles = await model.getArticles();
    res.json(articles);
  } catch (err) {
    return next(err);
  }
};

const getArticle = async (req, res, next) => {
  try {
    // TODO sanitize
    const id = req.params.id;

    const article = await model.getArticle(id);

    if (article != null) {
      res.json(article);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    return next(err);
  }
};

const addArticle = async (req, res, next) => {
  try {
    // TODO sanitize and validate authors
    const data = req.body;

    const articleId = await model.addArticle(data);

    res.links({
      article: `${articleId}/`
    });
    res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    // TODO sanitize
    const id = req.params.id;
    // TODO sanitize and validate authors
    const data = req.body;

    const updated = await model.updateArticle(id, data);

    if (updated) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    // TODO sanitize
    const id = req.params.id;

    const deleted = await model.deleteArticle(id);

    if (deleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    return next(err);
  }
};

router.get("/", getArticles);

router.post("/", addArticle);

router.get("/:id", getArticle);

router.patch("/:id", updateArticle);

router.delete("/:id", deleteArticle);

module.exports = router;
