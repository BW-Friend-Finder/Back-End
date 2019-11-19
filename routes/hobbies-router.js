const router = require("express").Router();

//import model
const hobbies = require("../models/hobbies-model.js");

//import validation middleware
const { authorize, validate } = require("../middleware/authenticationMW.js");

//get hobbies all hobbies

router.get("/", (req, res) => {
  hobbies
    .find()
    .then(interests => {
      res.status(200).json(interests);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `failed to retrieve hobbies`, error: error });
    });
});

//get hobby by id
router.get("/:id", authorize, (req, res) => {
  const id = req.params.id; //params or body?
  hobbies
    .findById(id)
    .then(interests => {
      res.status(200).json(interests);
    })
    .catch(error => {
      res.status(500).json({
        message: `failed to retrieve hobby with ID ${id}`,
        error: error
      });
    });
});

// add hobby to user_hobbies
router.post("/", authorize, (req, res) => {
  const { hobbies_id } = req.body;
  console.log(req.decodedJwt);
  const { userId } = req.decodedJwt;
  const hobby = { user_id: userId, hobbies_id: hobbies_id };
  console.log(hobby);
  hobbies
    .insert(hobby)
    .then(count => {
      res.status(201).json({ message: `Successfully added ${count} records` });
    })
    .catch(err => {
      console.log("Error...", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
