const express = require("express");
const bodyParser = require("body-parser");
const indexController = require("./controllers/index");
const authorController = require("./controllers/author");
const articleController = require("./controllers/article");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO authentication
// TODO may the public use of mongo ids expose sensitive information about the underlying architecture ??

app.use("/", indexController);
app.use("/authors/", authorController);
app.use("/articles/", articleController);

app.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Ups, something is not working");

  // TODO improve logs
  console.error(err);
});

module.exports = app;
