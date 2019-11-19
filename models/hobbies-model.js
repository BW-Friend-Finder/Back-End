const db = require("../configs/dbConfig");

module.exports = {
  find,
  findById,
  insert,
  remove,
  findByUserId
};


// all hobbies
function find() {
  return db("hobbies");
}

//get all hobbies by user_id
function findByUserId(user_id){
  return db('user_hobbies')
  .select('user_hobbies.user_id', 'user_hobbies.hobbies_id', 'hobbies.hobby_name')
  .join('hobbies', 'user_hobbies.hobbies_id', 'hobbies.hobbies_id')
  .where('user_hobbies.user_id', '=', `${user_id}`)
}

// by hobby id
function findById(hobbies_id) {
  return db("hobbies")
    .where({ hobbies_id })
    .first();
}

//add hobby to user profile
function insert(hobby) {
  console.log("Hobby...", hobby);
  return db('user_hobbies').insert(hobby);
}

//delete hobby from user by user_id
function remove(user_id, hobbies_id){
  return db('user_hobbies')
  .where({
    "user_id": user_id,
    "hobbies_id": hobbies_id
  })
  .delete();
}