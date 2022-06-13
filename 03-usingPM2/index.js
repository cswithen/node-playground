// Using PM2 `pm2 start index.js -i 0`

// to show list of all pm2 processes `pm2 list`
// to show list of one pm2 process `pm2 show index`
// to show interactible monitor list `pm2 monit`
// to delete `pm2 delete index`

// Im a child, Im going to act like a server and do nothing else
const express = require("express");
const crypto = require("crypto");
const app = express();

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("Hi there");
  });
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3001, () => {
  console.log(`
  Listening on port 3001

  http://localhost:3001/
`);
});
