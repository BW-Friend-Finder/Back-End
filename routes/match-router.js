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


//insert an array of objects into database, requires [{requestee:id}]
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
        res.status(500).json({error: error, message: `Failed to add new mathces`});
    });
});



//remove a match from user's matches. requires {user_match.id:id} (returned with get request for all user's matches) 
//removeMatch
router.delete('/', authorize, (req, res) => {
    const id = req.decodedJwt.userId;
    const match_id = req.body.id;

    match1.removeMatch(match_id)
    .then(count => {
        res.status(201).json({message: `Removed ${count} matches`});
    })
    .catch(error => {
        res.status(500).json({error: error, message: `Failed to remove matches.`});
    });
});

//update a requested match to a two-sided match (both sides have liked)
//requires user_match.id in body
router.put('/', authorize, (req, res) => {
    const user_match_id = req.body.id;

    match1.mutualMatch(user_match_id)
    .then(count => {
        res.status(201).json({message: `table was updated`})
    })
    .catch(error => {
        res.status(500).json({error: error, message: `failed to update user_match`});
    });
});


module.exports = router; 
