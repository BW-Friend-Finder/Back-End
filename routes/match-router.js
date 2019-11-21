const router = require('express').Router();


const {authorize, validate} = require('../middleware/authenticationMW');

const match1 = require('../models/match-model.js');

//get all of a users matches
//id pulled from decoded token, no need for path to :id
//front end doesn't need to
router.get('/user', authorize, (req, res) => {
    const user_id = req.decodedJwt.userId;

    match1.findMatchesById(user_id)
    .then(matches => {
        console.log(matches);
        res.status(200).json({ message: 'Successfully matches', matches});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'INTERNAL SERVER ERROR' })
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
        res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
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

//get array where user is requester

//get array where is requestee


//addmatch --> system should work like this: 
/*
1) client sends array of likes
2) compare array of likes against entries in user_match
3) if there is no matching entry, push to array to be written to db
4) if there IS a matching entry, push to array to be modified on db
4a) modify existing entry [matched:0 -> 1]
5) return success message to client

requires [ {"requestee":id}, {"requestee":id} ]

*/

router.post('/test', authorize, (req, res) => {
    const user_id = req.decodedJwt.userId;
    const matchArr = req.body;
    // console.log(matchArr);
    let requestValues = [];
    let updateArr = [];
    let exists = [];
    let newArr = [];
    let newMatch = [];
    // console.log(requestArr);



    match1.findByRequesteeId(user_id)
    .then(arr => {
        matchArr.forEach(match => {
            for (let i=0;i<arr.length;i++){
                if (match.requestee === arr[i].requester){
                    updateArr.push(arr[i].id);
                    exists.push(arr[i].requester);
                } else {
                    console.log(`no match`);
                }
            }
        });
        console.log('updateArr', updateArr);
        console.log(`exists`, exists);
        return updateArr, exists;
    })
    .then((exists,updateArr) => {
        console.log(exists);
        console.log(updateArr);
        matchArr.forEach(match => {
            if (!exists.includes(match.requestee)){
                newArr.push(match);
            }else {
                console.log(`match exists`);
            }
        })
        console.log(`newarr`, newArr);
        console.log(`updateArr`, updateArr);
        return newArr, updateArr;
    })//newarr updatearr are undefined here...
    .then((newArr, updateArr) => {
        console.log(`inside newMatch`);
        newMatch = newArr.map(match => {
            console.log(`inside map`);
            return {
                ...match,
                'requester':user_id,
                'matched': 0
            };
        });
        console.log('new match', newMatch);
        return newMatch, updateArr;
    })
    .then((newMatch, updateArr) => {
        console.log(newMatch, updateArr);
        match1.insertMatch(newMatch);
        return updateArr;
    })
    .then(updateArr => {
        
        match1.mutualMatch(updateArr)
        .then(response => {
            return response;
        });
        return response;
    })
    .then((response) => {
        res.status(200).json(`that worked`, response);
    })
    .catch(error => {
        res.status(500).json({error: error});
    });  
});


module.exports = router; 
