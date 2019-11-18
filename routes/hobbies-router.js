const router = require('express').Router();

//import model
const hobbies = require('../models/hobbies-model.js');

//import validation middleware
const {authorize, validate} = require('../middleware/authenticationMW.js');

//get hobbies

router.get('/', (req, res) => {
    hobbies.find()
    .then(interests => {
        res.status(200).json(interests);
    })
    .catch(error => {
        res.status(500).json({message: `failed to retrieve hobbies`, error: error});
    });
});

//get hobby by id
router.get('/:id', (req, res) => {
    const id = req.params.id; //params or body?
    hobbies.findById(id)
    .then(interests => {
        res.status(200).json(interests);
    })
    .catch(error => {
        res.status(500).json({message: `failed to retrieve hobby with ID ${id}`, error: error});
    });
});

module.exports = router;