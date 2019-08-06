#!/usr/bin/env node

const db = require("../db");
const app = require("../app");
const http = require("http");

const port = parseInt(process.env.PORT || "3000");
const server = http.createServer(app);

const start = async () => {
  try {
    await db.connect();

    server.listen(port, () => {
      console.log(`Web server listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Startup Error: ${err}`);
    process.exit(1);
  }
};

const shutdown = () => {
  server.close(async () => {
    console.log("Web server closed");

    try {
      await db.close();
      process.exit(0);
    } catch (err) {
      console.log(`Shutdown Error: ${err}`);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// start the application
start();
