process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");

// Is the file being exectuted in master mode?
if (cluster.isMaster) {
  // cause index.js to be executed *again* but in child
  cluster.fork();
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  // Im a child, Im going to act like a server and do nothing else
  const express = require("express");
  const crypto = require("crypto");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send("Hi there");
    })
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3001, () =>
    console.log(`
Listening on port 3001

http://localhost:3001/
`)
  );
}
