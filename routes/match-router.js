const router = require('express').Router();


const {authorize, validate} = require('../middleware/authenticationMW');

const match = require('../models/match-model.js');


router.get('/user/:id', (req, res) => {
    const user_id = req.params.id;

    match.findMatchesById(user_id)
    .then(matches => {
        console.log(matches);
        res.status(200).json(matches);
    })
    .catch(err => {
        console.log(err);
    });
});

//find matches



// router.get('/user/:id', authorize, (req,res) => {

//     const id = req.params.id;

//     match.findMatches(id)
//     .then(matches => {
//         console.log(matches);
//         res.status(200).json(matches)
//     })
//     .catch(err => {
//         res.status(500).json({error: err, message: `Failed to retrieve matches`});
//     });
// });



module.exports = router; 
