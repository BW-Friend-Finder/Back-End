const router = require("express").Router();

const { authorize } = require("../middleware/authenticationMW");

const db = require("../models/conversation-model");

//get specific convo by convo id
router.get("/convo/:id", authorize, (req, res) => {
  const id = req.body.id; //front end needs to send back the conversation id

  db.findConvoById(id)
    .then(convo => {
      console.log(convo);
      res.status(200).json(convo);
    })
    .catch(err => {
      console.log("Error...", err);
      res.status(500).json({ error: "Failed to retrieve messages" });
    });
});

//get all of a users convo's by user id
router.get("/convo/", authorize, (req, res) => {
  const id = req.decodedJwt.userId;

  db.findConvoById(id)
    .then(convo => {
      console.log(convo);
      res.status(200).json(convo);
    })
    .catch(err => {
      console.log("Error...", err);
      res.status(500).json({ error: "Failed to retrieve messages" });
    });
});



router.post("/convo/:id", authorize, (req, res) => {
  //frontend must send the conversations id. Will have access from the initial get all convos by user_id
  const chat = { 
    ...req.body, 
    user_id: req.decodedJwt.userId ,
  };

  db.findConvoById(conversations.id)
    .then(convo => {
      if (convo) {
        db.insertConvo(chat).then(chat => {
          res.status(201).json(chat);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find conversation with that ID" });
      }
    })
    .catch(err => {
      console.log("Error...", err);
      res.status(500).json({ error: "Failed to initialize chat" });
    });
});

module.exports = router;
