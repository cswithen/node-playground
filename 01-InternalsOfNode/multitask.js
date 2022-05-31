// process.env.UV_THREADPOOL_SIZE = 1

const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Request: ", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash: ", Date.now() - start);
  });
}

// https does not use the threadpool at all and immediately uses the OS
doRequest();

// the fs.readFile and doHash calls all got assigned a thread, but there is only 4 threads, fs.readFile had to go through its own loop of getting stats of the file then calling the file
fs.readFile("multitask.js", "utf8", () => {
  console.log("FS: ", Date.now() - start);
});

// the thread fs.readFile becomes available because node thinks that it will take forever and tackles a different task

// then once one of the doHash threads becomes available, it then becomes available to the fs.readFile again
doHash();
doHash();
doHash();
doHash();

// console.log order:
//   1. doRequest
//   2. doHash x1
//   3. fs.readFile
//   4. doHash x3
