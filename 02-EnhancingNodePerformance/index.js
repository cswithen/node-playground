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
  const app = express();

  const doWork = (duration) => {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  };

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000, () =>
    console.log(`
Listening on port 3000

http://localhost:3000/
`)
  );
}
