const { MongoClient, ObjectID } = require("mongodb");

const dbServerURI = process.env.DB_SERVER_URI || "mongodb://localhost:27017/";
const poolSize = parseInt(process.env.DB_POOL_SIZE || "15");
const connectionOptions = { useUnifiedTopology: true, poolSize: poolSize };
const dbName = process.env.DB_NAME || "blog";

const connectionsPool = new MongoClient(dbServerURI, connectionOptions);

// TODO validate and prevent possible race conditions while checking for isConnected
const connect = async () => {
  if (!connectionsPool.isConnected()) {
    await connectionsPool.connect();
    console.log("Database connected");
    return;
  } else {
    throw new Error("Database is already connected");
  }
};

const client = () => {
  if (connectionsPool.isConnected()) {
    return connectionsPool.db(dbName);
  } else {
    throw new Error("Database is not connected");
  }
};

const close = async () => {
  if (connectionsPool.isConnected()) {
    await connectionsPool.close();
  }

  console.log("Database disconnected");
  return;
};

const idFromHex = (str) => ObjectID.createFromHexString(str);

const parsePageLimits = ({ page, size }) => ({
  skip: page * size,
  limit: size,
});

module.exports = {
  connect: connect,
  client: client,
  close: close,
  idFromHex: idFromHex,
  parsePageLimits: parsePageLimits,
};
