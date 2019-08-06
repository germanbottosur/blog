const db = require("../db");

const getArticles = async () => {
  const cursor = db
    .client()
    .collection("articles")
    .find({ deleted_at: null });

  const articles = [];
  await cursor.forEach(doc => {
    articles.push({
      id: doc._id,
      title: doc.title,
      updated_at: doc.updated_at
    });
  });

  return articles;
};

const getArticle = async id => {
  const objectID = db.getObjectId(id);

  const doc = await db
    .client()
    .collection("articles")
    .findOne({ _id: objectID, deleted_at: null });

  if (doc != null) {
    return {
      id: doc._id,
      title: doc.title,
      short_description: doc.short_description,
      long_description: doc.long_description,
      authors: doc.authors,
      created_at: doc.created_at,
      updated_at: doc.updated_at
    };
  } else {
    return doc;
  }
};

const addArticle = async data => {
  const now = new Date();
  const articleData = {
    title: data.title,
    short_description: data.short_description,
    long_description: data.long_description,
    authors: data.authors,
    created_at: now,
    updated_at: now,
    deleted_at: null
  };

  const insert = await db
    .client()
    .collection("articles")
    .insertOne(articleData);

  return insert.insertedId;
};

const updateArticle = async (id, data) => {
  const now = new Date();
  const articleData = {
    title: data.title,
    short_description: data.short_description,
    long_description: data.long_description,
    authors: data.authors,
    updated_at: now
  };

  const objectID = db.getObjectId(id);
  const update = await db
    .client()
    .collection("articles")
    .updateOne({ _id: objectID, deleted_at: null }, { $set: articleData });

  return update.result.nModified > 0;
};

const deleteArticle = async id => {
  const objectID = db.getObjectId(id);
  const now = new Date();

  const update = await db
    .client()
    .collection("articles")
    .updateOne(
      { _id: objectID, deleted_at: null },
      { $set: { deleted_at: now } }
    );

  return update.result.nModified > 0;
};

module.exports = {
  getArticles: getArticles,
  getArticle: getArticle,
  addArticle: addArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle
};
