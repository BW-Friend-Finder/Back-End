const router = require("express").Router();

//import model
const hobbies = require("../models/hobbies-model.js");

//import validation middleware
const { authorize, validate } = require("../middleware/authenticationMW.js");

//get hobbies all hobbies
router.get("/all", (req, res) => {
  hobbies
    .find()
    .then(interests => {
      res.status(200).json({ message: "Successfully returned all hobbies", interests});
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `failed to retrieve hobbies`, error: error });
    });
});

// get all user hobbies by user_id
router.get('/user', authorize, (req, res) => {
    const id = req.decodedJwt.userId;

    hobbies.findByUserId(id)
    .then(hobbyArr => {
        console.log(hobbyArr);
        res.status(200).json(hobbyArr);
    })
    .catch(error => {
        console.log(error);
    });
});


//get hobby by id
router.get("/", authorize, (req, res) => {
    // const id = req.decodedJwt.userId;
    const id = req.body.hobbies_id
  hobbies
    .findById(id)
    .then(interests => {
      if (interests === [] || interests === null){
        res.status(404).json({message: `User does not exist`});
      }else {
        res.status(200).json(interests);
      };
    })
    .catch(error => {
      res.status(500).json({
        message: `failed to retrieve hobby with ID ${id}`,
        error: error
      });
    });
});

// add hobby to user_hobbies
router.post("/user", authorize, (req, res) => {
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

//delete user hobby by user_id and hobby_id
router.delete('/user', authorize, (req, res) => {
    const {hobbies_id} = req.body;
    const {userId} = req.decodedJwt;

    hobbies.remove(userId, hobbies_id)
    .then(count => {
        console.log(count);
        res.status(200).json({message: `Successfully removed ${count} records.`})
    })
    .catch(err => {
        res.status(500).json({Error: err})
    });
});




module.exports = router;
