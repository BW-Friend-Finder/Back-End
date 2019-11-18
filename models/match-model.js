const db = require("../configs/dbConfig");

module.exports = {
  findByMatchId,
  findByRequesterId,
  findByRequesteeId,
  insertMatch,
};

function findByMatchId(id) {
  return db
    .select("user_match.id", "user.user_id", "user_match.requester_id")
    .from("user_match")
    .join("users", "users.user_id", "user_match.requestee_id")
    .where("user_match.matched", true);
}

function findByRequesterId({ user_id }) {
    const id = user_id
    
    return db('user_match').where({ requester_id = id }).first()
}

function findByRequesteeId({ user_id }) {
    const id = user_id

    return db('user_match').where({ requestee_id = id }).first()
}

function insertMatch(match) {
    return db('user_match')
        .insert(match)
}

// removeMatch

