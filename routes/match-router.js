const router = require('express').Router();


const {authorize, validate} = require('../middleware/authenticationMW');

const match1 = require('../models/match-model.js');

//get all of a users matches
//id pulled from decoded token, no need for path to :id
router.get('/user/', authorize, (req, res) => {
    const user_id = req.decodedJwt.userId;

    match1.findMatchesById(user_id)
    .then(matches => {
        console.log(matches);
        res.status(200).json(matches);
    })
    .catch(err => {
        console.log(err);
    });
});

//add a match to user_matches
//post insert match to user_matches
router.post('/', authorize, (req,res) => {
    
    const id = req.decodedJwt.userId;
    const matchArr = req.body;
    

    match1.insertMatch(matchArr, id)
    .then(count => {
        res.status(201).json({message: `${count} records inserted into database`});
    })
    .catch(err => {
        res.status(500).json({message:`failed to add matches`, error: err});
    });
});

//remove a match from 
//removeMatch



module.exports = router; 
