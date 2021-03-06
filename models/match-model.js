const db = require("../configs/dbConfig");
const knex = require('knex');

module.exports = {
  findByRequesterId,
  findByRequesteeId,
  insertMatch,
  findMatchesById,
  removeMatch,
  mutualMatch,
  findByMatchId
};


//find the people that have requested a match with the logged in user's ID
function findByRequesterId(user_id) {
    const id = user_id
    
    return db('user_match').where("requester", "=", `${user_id}`);
}


//find the people that the logged in user has liked based on logged in user's id
function findByRequesteeId(user_id) {
    const id = user_id

    return db('user_match').where("requestee","=",`${user_id}`);
}

// get list of MATCHES (both sides have liked each other) by signed in user's ID
function findMatchesById(user_id) {
  const id = user_id;

  return db.raw(`SELECT * FROM user_match JOIN users ON (users.user_id = user_match.requestee OR users.user_id = user_match.requester) AND NOT users.user_id = ${id} WHERE (user_match.requestee = ${id} OR user_match.requester = ${id}) AND user_match.matched = 1`);

}


//insert array of matches ('liked users')
function insertMatch(matchArr) {
    console.log(`insertMatch from model`,matchArr);
    return db('user_match').insert(matchArr);
  }


// removeMatch 
function removeMatch(user_match_id) {
  return db('user_match').where("user_match.id", '=', `${user_match_id}`).del();
}

//get a specific user_match object by user_match.id
function findByMatchId(match_id){
  console.log(match_id)
  return db("user_match")
  .where("id", match_id)
}

//if user likes requester back
 function mutualMatch(Arr){
  const trueInt = 1;
  
  return db("user_match")
  .where("id",'=', `${Arr}`)
  .update("matched", 1);
}

