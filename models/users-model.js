const db = require("../configs/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  insert,
  update,
  remove,
  findFriends
};


//get tinder queue
function findFriends(user_id){
  return db('user_match')
  .select('users.user_id', 'users.email', 'users.first_name', 'users.last_name', 'users.age', 'users.gender', 'users.city', 'users.state', 'users.zipcode')
  .join('users', 'user_match.requester', '=', 'users.user_id' )
  .whereNot('user_match.requester', '=', `${user_id}`);
}



function find() {
  return db("users");
}

function findBy(filter) {
  return db("users")
  .where(filter)
  .first();
}

function findById(user_id) {
  return db("users")
    .select('user_id','email', 'first_name', 'last_name', 'age', 'gender', 'city', 'state', 'zipcode')
    .where("user_id",user_id)
    .first();
}

function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(user_id, changes) {
  return db("users")
    .where("user_id",user_id)
    .update(changes)
    .then(() => {
      return findById(user_id)
    });
}

function remove(user_id) {
  return db("users")
    .where("user_id", user_id)
    .del();
}
