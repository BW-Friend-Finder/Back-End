const router = require('express').Router();


const {authorize, validate} = require('../middleware/authenticationMW');

const match1 = require('../models/match-model.js');

//get all of a users matches
//id pulled from decoded token, no need for path to :id
//front end doesn't need to send user_id as param or in body.
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

//get array where logged in user is requester

router.get('/requester', authorize, (req, res) => {
    const id = req.decodedJwt.userId;

    match1.findByRequesterId(id)
    .then(sentRequests => {
        res.status(200).json({message: `Retrieved sent requests`,sentRequests});
    })
    .catch(error => {
        res.status(500).json({error: error, message:`there was an error retrieving sent requests`});
    });
});


//get array where logged in user is requestee

router.get('/requestee', authorize, (req, res) => {
    const id = req.decodedJwt.userId;

    match1.findByRequesteeId(id)
    .then(requests => {
        res.status(200).json({message: `Retrieved match requests`,requests});
    })
    .catch(error => {
        res.status(500).json({error: error, message:`there was an error retrieving match requests`});
    });
});

//insert an array of objects into database, requires [{requestee:id}] replaced by conditional version, keeping here for reference
// router.post('/', authorize,  (req,res) => {
//     const id = req.decodedJwt.userId;
//     const matchArr = req.body;

//      const newMatch = matchArr.map(match => {
//         return {
//             ...match,
//             'requester':id,
//             'matched': 0
//         };
//     });

//     console.log(newMatch);

//     match1.insertMatch(newMatch)
//     .then(count => {
//         res.status(200).json({message: `${matchArr.length} matches have been added.`});
//     })
//     .catch(error => {
//         res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
//     });
// });



/* _________________________________conditional matching_____________________________________________*/
//addmatch --> system should work like this: 
/*
1) client sends array of likes
2) compare array of likes against findByRequesteeId results
3) if there is no matching entry, push to array to be written to db
4) if there IS a matching entry, push to array to be modified on db
4a) modify existing entry [matched:0 -> 1]
5) return success message to client after ALL OPERATIONS COMPLETED SUCCESSFULLY

*****requires array of objects in format: [ {"requestee":id}, {"requestee":id} ]*****
*/

router.post('/', authorize, (req, res) => {
    const user_id = req.decodedJwt.userId;
    const matchArr = req.body;



    match1.findByRequesteeId(user_id)
    .then(arr => {
        let updateArr = [];
        let exists = [];
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
    })
    .then((r) => {
        let newArr = [];
  
        matchArr.forEach(match => {
            if (!r.exists.includes(match.requestee)){
                newArr.push(match);
            }else {
                console.log(`match exists`);
            }
        });
        let updateArray = r.updateArr;
        return {newArr, updateArray};
    })
    .then((r) => {
        let newMatch = r.newArr.map(match => {
            console.log(`inside map`);
            return {
                ...match,
                'requester':user_id,
                'matched': 0
            };
        });
        let updateArray = r.updateArray;
        return {newMatch, updateArray};
    })
    .then((r) => {
        match1.insertMatch(r.newMatch)
        .then(response => {console.log(`161`, response)});
        return r.updateArray;
    })
    .then(updateArr => {
        updateArr.forEach(update => {
            match1.mutualMatch(update)
                .then(response => {
                    console.log(response);
                 });
             });
        console.log(`194`, updateArr);
        return updateArr;
    })
    .then(updateArr => {
        let newMatches = updateArr.map(id => {
            return {
                user_id:id
            }
        });
        return newMatches;
    })
    .then(newMatches => {
        // console.log(`209`, newMatches)
        res.status(200).json({newMatches: newMatches});
    })
    .catch(error => {
        res.status(500).json({error: error});
    });  
});


module.exports = router; 
