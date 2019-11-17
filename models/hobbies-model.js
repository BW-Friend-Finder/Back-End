const db = require("../database/dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
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

//add hobby using hobby object
async function add(hobby){
  const [hobbies_id] = await db('hobbies').insert(hobby);
  return findById(hobbies_id);
}

//update existing hobby by hobbies_id
function update(id, updates){
  return db('hobbies').where({id}).update(updates);
}


//delete hobby by hobbies_id
function remove(id){
  return db('hobbies').where({id}).delete();
}