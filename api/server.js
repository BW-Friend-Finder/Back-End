const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

//routers
const hobbyRouter = require("../routes/hobbies-router.js");
const userRouter = require("../routes/users-router.js");
const matchRouter = require("../routes/match-router.js");
const convoRouter = require("../routes/conversation-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

//router endpoints
server.use("/api/hobbies", hobbyRouter);
server.use("/api/users", userRouter, convoRouter);
server.use("/api/match", matchRouter);

// confirm api
server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "api running", environment: process.env.DB_ENV });
});

module.exports = server;
