const router = require('express').Router();


const {authorize, validate} = require('../middleware/authenticationMW');

const match1 = require('../models/match-model.js');

//get all of a users matches
//id pulled from decoded token, no need for path to :id
router.get('/user', authorize, (req, res) => {
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



router.post('/', authorize,  (req,res) => {
    const id = req.decodedJwt.userId;
    const matchArr = req.body;

     const newMatch = matchArr.map(match => {
        return {
            ...match,
            'requester':id,
            'matched': 0
        };
    });

    console.log(newMatch);

    match1.insertMatch(newMatch)
    .then(count => {
        res.status(200).json({message: `${matchArr.length} matches have been added.`});
    })
    .catch(error => {
        console.log(error);
    });
});



//remove a match from 
//removeMatch



module.exports = router; 
