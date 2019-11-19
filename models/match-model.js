const db = require("../configs/dbConfig");
const knex = require('knex');

module.exports = {
  findByRequesterId,
  findByRequesteeId,
  insertMatch,
  findMatchesById,
  removeMatch
};


//find the people that have requested a match with the logged in user's ID
function findByRequesterId(user_id) {
    const id = user_id
    
    return db('user_match').where(requester_id = id);
}


//find the people that the logged in user has liked based on logged in user's id
function findByRequesteeId(user_id) {
    const id = user_id

    return db('user_match').where(requestee_id = id);
}

// get list of MATCHES (both sides have liked each other) by signed in user's ID
function findMatchesById(user_id) {
  const id = user_id;

  return db.raw(`SELECT * FROM user_match JOIN users ON (users.user_id = user_match.requestee OR users.user_id = user_match.requester) AND NOT users.user_id = ${id} WHERE (user_match.requestee = ${id} OR user_match.requester = ${id}) AND user_match.matched = 1`);

}

//takes in requester_id, requestee_id, default value of matched is 0 (false);
//expect array
// async function insertMatch(matchArr) {
//   let count = 0;
//   await matchArr.forEach(match => {
//     console.log(match);
//     db('user_match').insert(match);
//     count++;
//   });

//   return count;
// }


async function insertMatch(matchArr, id) {
  let count = 0;
  await matchArr.forEach(match => {

    const newMatch = {
      ...match,
      requester:id,
      matched:0
    };
    // console.log(newMatch);
    db('user_match').insert(newMatch);
    console.log(newMatch);
    count++;
  });

  return count;
}


// removeMatch 
function removeMatch(user_match_id) {
  return db('user_match').where("user_match.id", user_match_id).del();
}


