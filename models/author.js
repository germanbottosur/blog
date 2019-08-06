const db = require("../db");

const getAuthors = async () => {
  const cursor = db
    .client()
    .collection("authors")
    .find();

  const authors = [];
  await cursor.forEach(doc => {
    authors.push({
      id: doc._id,
      name: doc.name
    });
  });

  return authors;
};

module.exports = {
  getAuthors: getAuthors
};
