const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//model
const users = require("../models/users-model.js");
const hobbies = require("../models/hobbies-model.js");

//validate middleware
const { authorize, validate } = require("../middleware/authenticationMW.js");
const getToken = require("../middleware/getToken");

//login --tested, working, returns token and user object
router.post("/signin", (req, res) => {
  let { email, password } = req.body;

  users
    .findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getToken(user.email, user.user_id);

        console.log(user);

        const user_details = {
          id: user.user_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          age: user.age,
          gender: user.gender,
          city: user.city,
          state: user.state,
          zipcode: user.zipcode
        };

        res
          .status(200)
          .json({
            message: `${user.email} successfully logged in`,
            token,
            user_details
          });
      } else {
        res.status(404).json({ error: `User does not exist` });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: error, message: `There was an error logging in.` });
    });
});

//register --tested, working, hashes password
router.post("/register", (req, res) => {
  let newUser = req.body;
  console.log(req.body);
  console.log(newUser);
  const validateResult = validate(newUser);

  if (validateResult.isSuccessful === true) {
    const hashedPass = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hashedPass;

    users
      .insert(newUser)
      .then(user => {
        console.log(user);
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: error, message: `Failed to register new user` });
      });
  } else {
    res
      .status(400)
      .json({
        message: `Invalid registration details`,
        error: validateResult.errors
      });
  }
});

//get user by id --> first pass req/res to authorize function to check for valid token --tested, working, returns user object sans password
//now set up to grab the user id from the decoded token

router.get("/", authorize, (req, res) => {
  const id = req.decodedJwt.userId;
  console.log(id);

  users
    .findById(id)
    .then(user => {
      console.log(user);
      user
        ? res.status(200).json(user)
        : res
            .status(404)
            .json({ message: `could not find user with id ${id}` });
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Failed to get user. Please check request and connection.`,
          error: error
        });
    });
});

//edit user /:id/edit --> test, working, returns UPDATED user object
router.put("/", authorize, (req, res) => {
  const id = req.decodedJwt.userId;
  const updates = req.body;
  console.log(updates);

  users.findById(id).then(user => {
    // console.log(user);
    console.log(`after find by id`);
    if (user) {
      users.update(user.user_id, updates).then(updatedUser => {
        res.status(201).json({updatedUser, message: "Successfully updated"});
      });
    } else {
      res
        .status(404)
        .json({ message: `User ${user.id} doesn't exist` });
    }
  });
});

//delete user /:id --> tested, working, returns count of records deleted, and specific user id
router.delete("/", authorize, (req, res) => {
  const id = req.decodedJwt.userId;

  users.remove(id).then(count => {
    count
      ? res
          .status(202)
          .json({ message: `removed ${count} records. User ${id} was deleted` })
      : res
          .status(404)
          .json({ message: `Unable to locate user with id ${id}.` });
  });
});

//dump user table //remove before production
router.get('/dump', (req, res) => {
  users.find()
  .then(users => {
    res.send(users);
  })
  .catch(error => {
    res.send({error: error});
  });
});

//get users for tinder display using user_id and hobbies_id's

router.get('/matches', authorize, (req, res) => {
  const id = req.decodedJwt.userId;

  let hobbyArr = [];
  let hobIds = [];
  let userArr = [];
  let testArr = [];

  hobbies.getHobbyList(id)
  .then(hobbyIds => {
    hobbyArr = hobbyIds;
    hobbyArr.forEach(hobby => {
      hobIds.push(hobby.hobbies_id);
    });
    console.log(hobIds);
    return hobIds;
  })
  .then(hobIds => {
    
    hobIds.forEach(id => {
      hobbies.getUsers(id)
      .then(users => {
        users.forEach(user => {
          // console.log(user);
          if(!userArr.includes(user.user_id)){
            userArr.push(user.user_id);
          };
        });
        console.log(`testUserarr`,userArr);
        return userArr;
      })
      .then(userArr => {
        console.log(`194`,userArr);
        testArr = userArr;
        return userArr;
      })
      console.log(userArr, testArr);
    })//forEach
    console.log(userArr);
    console.log(testArr);
    return userArr;
  })
  .then(userArr => {
    console.log(`userArr`,userArr);
  })


});




module.exports = router;
