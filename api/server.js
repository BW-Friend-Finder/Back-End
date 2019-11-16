const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "api running", environment: process.env.DB_ENV });
});

module.exports = server;
