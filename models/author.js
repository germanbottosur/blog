const db = require("../db");

const getAuthors = async () => {
  const cursor = db
    .client()
    .collection("authors")
    .find()
    .map(doc => {
      return {
        id: doc._id,
        name: doc.name
      };
    });

  return cursor.toArray();
};

module.exports = {
  getAuthors: getAuthors
};
