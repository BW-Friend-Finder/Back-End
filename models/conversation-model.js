const db = require("../configs/dbConfig");

module.exports = {
  findConvoById,
  insertConvo,
  getConvoMessages,
  addMessage
};

//get all conversations for a user
//returns array of objects in format: 
// {
//   "id": 6,
//   "first_name": "Audrey", (other persons first and last name)
//   "last_name": "Lane"
// }
function findConvoById(user_id) {
  const id = user_id;

  console.log(`inside findConvobyId`);

  return db.raw(`SELECT conversations.id, users.first_name, users.last_name FROM conversations JOIN users ON (users.user_id = conversations.person_1 OR users.user_id = conversations.person_2) AND NOT users.user_id = ${id} WHERE conversations.person_1 = ${id} OR conversations.person_2 = ${id}`);
}

//add a new convo --> inserts a new convo (will need id for person_2. person_1 is user, pulled from token) needs route
function insertConvo(convo) {
  return db("conversations").insert(convo);
}


//get all messages in a convo by convo id
function getConvoMessages(convo_id){
  return db.raw(`SELECT conversations.id, messages.message_body, messages.time FROM conversations JOIN messages ON messages.conversation_id = conversations.id WHERE conversations.id = ${convo_id}`);
}


//add new message to messages table

function addMessage(message){
  console.log(message);
  return db('messages').insert(message);
}





