const router = require("express").Router();

const { authorize } = require("../middleware/authenticationMW");

const db = require("../models/conversation-model");

//get specific convo by convo id
router.get("/convo/:id", authorize, (req, res) => {
  const id = req.params.id;

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
router.get("/:id/convo/", authorize, (req, res) => {
  const id = req.params.id; //this will need to pull user_id from req.headers.decodedJwt

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



router.post("/:id/convo/:id", (req, res) => {
  const chat = { ...req.body, id: req.params.id };

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
