const db = require("../configs/dbConfig");

module.exports = {
  find,
  findById,
  insert,
  remove
};


// all hobbies
function find() {
  return db("hobbies");
}

// by hobby id
function findById(hobbies_id) {
  return db("hobbies")
    .where({ hobbies_id })
    .first();
}

//add hobby to user profile
function insert(hobby) {
  return db('user_hobbies').insert(hobby);
}

//delete hobby by hobbies_id
function remove(id){
  return db('hobbies').where({id}).delete();
}