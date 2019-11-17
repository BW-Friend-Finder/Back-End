const db = require("../database/dbConfig");

module.exports = {
  find,
  findById
};

function find() {
  return db("hobbies");
}

function findById(hobbies_id) {
  return db("hobbies")
    .where({ hobbies_id })
    .first()
}
