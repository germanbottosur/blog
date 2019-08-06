const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const dbServerURI = process.env.DB_SERVER_URI || "mongodb://localhost:27017/";
const poolSize = parseInt(process.env.DB_POOL_SIZE || "15");
const dbName = process.env.DB_NAME || "blog";

const connectionOptions = { useNewUrlParser: true, poolSize: poolSize };

let connectionPool = null;

const connect = async () => {
  if (connectionPool === null) {
    connectionPool = await MongoClient.connect(dbServerURI, connectionOptions);
    console.log("Database connected");
    return;
  } else {
    throw new Error("Database is already connected");
  }
};

const client = () => {
  if (connectionPool === null) {
    throw new Error("Database is not connected");
  } else {
    return connectionPool.db(dbName);
  }
};

const close = async () => {
  if (connectionPool !== null) {
    await connectionPool.close();
    connectionPool = null;
  }

  console.log("Database disconnected");
  return;
};

// TODO rename
const getObjectId = str => {
  try {
    return new ObjectID(str);
  } catch (err) {
    // TODO improve
    return null;
  }
};

module.exports = {
  connect: connect,
  client: client,
  close: close,
  getObjectId: getObjectId
};
