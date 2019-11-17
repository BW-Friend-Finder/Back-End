const express = require("express");

const server = express();

//routers
const hobbyRouter = require('../routes/hobbies-router.js');
const userRouter = require('../routes/users-router.js');


server.use(express.json());

//router endpoints
server.use('/api/hobbies', hobbyRouter);
server.use('/api/users', userRouter);




// confirm api 
server.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "api running", environment: process.env.DB_ENV });
});

module.exports = server;
