const db = require("../configs/dbConfig");

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

function findMatchesById({ user_id }) {
  const id = user_id

  // return db('user_match').where({requestee_id = id || requester_id = id}).and(user_match.matched = 1);

  return db
  .select('users.*')
  .from('user_match')
  .where(
    {
      requestee_id: id,
      requester_id: id,
      matched: 1
    })
  .join('users', 'users.user_id', 'user_match.')
}

function insertMatch(match) {
    return db('user_match')
        .insert(match)
}

// removeMatch

