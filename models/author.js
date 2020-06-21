const db = require("../db");

const getAuthors = async (pageParams) => {
  const pageLimits = db.parsePageLimits(pageParams);

  return (
    db
      .client()
      .collection("authors")
      .find()
      // TODO case insensitive index
      .sort({ name: 1 })
      .skip(pageLimits.skip)
      .limit(pageLimits.limit)
      .map((doc) => ({
        id: doc._id,
        name: doc.name,
      }))
      .toArray()
  );
};

module.exports = {
  getAuthors: getAuthors,
};
