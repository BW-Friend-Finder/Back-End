const router = require('express').Router;


const {authorize, validate} = require('../middleware/authenticationMW');

const match = require('../models/match-model.js');


router.get('/:id', (req, res) => {
    const matchId = req.params.id;

    match.findByMatchId(matchId)
    .then(match => {
        
    })
})





module.exports = router; 
