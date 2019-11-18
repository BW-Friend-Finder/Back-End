const db = require("../configs/dbConfig");
const knex = require('knex');

module.exports = {
  findByRequesterId,
  findByRequesteeId,
  insertMatch,
  findMatchesById
};

// function findMatched() {
//   return db
//     .select("user_match.id", "user.user_id", "user_match.requester_id")
//     .from("user_match")
//     .where()
//     .join("users", "users.user_id", "user_match.requestee_id")
//     .where("user_match.matched", true);
// }

function findByRequesterId({ user_id }) {
    const id = user_id
    
    return db('user_match').where(requester_id = id);
}

function findByRequesteeId({ user_id }) {
    const id = user_id

    return db('user_match').where(requestee_id = id);
}

function findMatchesById(user_id) {
  const id = user_id;


  return db.raw(`SELECT * FROM user_match JOIN users ON (users.user_id = user_match.requestee OR users.user_id = user_match.requester) AND NOT users.user_id = ${id} WHERE user_match.requestee = ${id} OR user_match.requester = ${id}`);

}


function insertMatch(match) {
    return db('user_match').insert(match);
}

// removeMatch



