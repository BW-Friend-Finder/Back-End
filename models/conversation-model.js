const db = require("../configs/dbConfig");

module.exports = {
  findByP1Id,
  findByP2Id,
  findConvoById,
  insertConvo
};

function findByP1Id({ user_id }) {
  const id = user_id;

  return db("user_match").where((person_1 = id));
}

function findByP2Id({ user_id }) {
  const id = user_id;

  return db("user_match").where((person_2 = id));
}

function findConvoById({ user_id }) {
  const id = user_id;

  return db
    .select("users.*")
    .from("conversations")
    .join("users", "users.user_id")
    .where({
      person_1: id,
      person_2: id
    });
}

function insertConvo(convo) {
  return db("conversations").insert(convo);
}
