const db = require("../configs/dbConfig");

module.exports = {
  findConvoById,
  insertConvo
};

function findConvoById({ user_id }) {
  const id = user_id;

  return db.raw(`SELECT * from conversations JOIN users ON (users.user_id = conversations.person_1 OR users.user_id = conversations.person_2) AND NOT users.user_id = ${id} WHERE conversations.person_1 = ${id} OR conversations.person_2 = ${id}`)


  // return db
  //   .select("users.*")
  //   .from("conversations")
  //   .join("users", "users.user_id")
  //   .where({
  //     person_1: id,
  //     person_2: id
  //   });
}

function insertConvo(convo) {
  return db("conversations").insert(convo);
}
