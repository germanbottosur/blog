// TODO case insensitive index
db.authors.createIndex({ name: 1 });

db.authors.insertMany([
  { name: "Jorge" },
  { name: "Julio" },
  { name: "Antoine" },
  { name: "Stephen" },
  { name: "Franz" },
]);

// TODO case insensitive index
db.articles.createIndex({ title: 1 });
