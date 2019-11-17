const router = require('express').Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//model
const users = require('../models/users-model.js');

//validate middleware
const {authorize, validate} = require('../middleware/authenticationMW.js');
const getToken = require('../middleware/getToken');

//login
router.post('/login', (req,res) => {
    let {email, password} = req.body;

    users.findBy(email)
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = getToken(user.email);

            res.status(200).json({message: `${user.email} successfully logged in`, token});
        } else {
            res.status(401).json({error: `Invalid Credentials`});
        }
    })
    .catch(error => {
        res.status(500).json({error: error, message: `There was an error logging in.`});
    });
});

//register

router.post('/register', (req, res) => {
    let newUser = req.body;

    const validateResult = validate(newUser);

    if(validateResult.isSuccessful === true){
        const hashedPass = bcrypt.hashSync(user.password, 12);
        newUser.password = hashedPass;

        users.insert(newUser)
        .then(user => {
            console.log(user);
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({error: error, message: `Failed to register new user`});
        });
    } else {
        res.status(400).json({message: `Invalid registration details`, error: validateResult.errors});
    };
});

//get user by id --> first pass req/res to authorize function to check for valid token

router.get('/:id', authorize, (req, res) => {
        
    const {id} = req.params;

    users.findById(id)
    .then(user => {
        user ? res.status(200).json(user) : res.status(404).json({message: `cound not find user with id ${id}`});
    })
    .catch(error => {
        res.status(500).json({message: `Failed to get user. Please check request and connetion.`});
    });
});

//edit user /:id/edit

router.put('/:id', authorize, (req,res) =>{
    const {id} = req.params;

    const updates = req.body;

    users.findById(id)
    .then(user => {
        user ? 
        (users.update(user.id, updates).then(updatedUser => res.status(201).json(updatedUser))) 
        : (res.status(404).json({message: `Could not find user with id ${user.id}`}))
    })
})




//delete user /:id





module.exports = router;