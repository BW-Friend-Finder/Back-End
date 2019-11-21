const db = require("../configs/dbConfig");

module.exports = {
  find,
  findById,
  insert,
  remove,
  findByUserId,
  getHobbyList,
  getUsers
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

//get hobbies_id's by user_id
function getHobbyList(user_id){

  return db('user_hobbies')
  .select('hobbies.hobbies_id')
  .join('hobbies', 'user_hobbies.hobbies_id', 'hobbies.hobbies_id')
  .where('user_hobbies.user_id', '=', `${user_id}`);
}


//get users from user_hobbies by hobby id

function getUsers(hobbyId){
  return db("user_hobbies")
  .select("user_hobbies.user_id")
  .where("user_hobbies.hobbies_id", "=", `${hobbyId}`);
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
// function remove(user_id, hobbies_id){
//   return db('user_hobbies')
//   .where({
//     "user_id": user_id,
//     "hobbies_id": hobbies_id
//   })
//   .delete();
// }

async function remove(arr){
  let count = 0;
  await arr.forEach(object => {
    db('user_hobbies')
    .where({
      "user_id": object.user_id,
      "hobbies_id": object.hobbies_id
    })
  .delete()
  .then(response => {
   return count + response;
  });
  });
}