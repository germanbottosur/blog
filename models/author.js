const db = require("../db");

const getAuthors = async () => {
  return db
    .client()
    .collection("authors")
    .find()
    .map((doc) => ({
      id: doc._id,
      name: doc.name,
    }))
    .toArray();
};

module.exports = {
  getAuthors: getAuthors,
};
