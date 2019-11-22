const cv = require('../models/conversation-model.js');
const users = require('../models/users-model.js');
const db = require('../configs/dbConfig.js');

const user = {
    email: 'matt@matt.matt',
    password: 'password',
    first_name: 'matt',
    last_name: 'gill',
    age: 35, 
    gender: 'male',
    city: 'baltimore',
    state: 'md',
    zipcode: 21093
};

const user2 = {
    email: 'matt1@matt.matt',
    password: 'password',
    first_name: 'matt',
    last_name: 'gill',
    age: 35, 
    gender: 'male',
    city: 'baltimore',
    state: 'md',
    zipcode: 21093
};

const conversation = {
    person_1:1,
    person_2:2
};


const message = {
    conversation_id:1,
    message_body:"this is the body of the message"
};







describe('conversations and messages', () => {

    beforeEach(async () => {
        await db('users').truncate();
        await db('conversations').truncate(); 
        await db('messages').truncate();
    });


    describe('add a conversation', () => {

        it('should add a new conversation', async () => {

            await users.insert(user);
            await users.insert(user2);
            await cv.insertConvo(conversation);

            const testConvo = await db('conversations');
            expect(testConvo.length).toBe(1);
        });

        it('should insert a message', async () => {

            await cv.addMessage(message);

            const insertMessage = await cv.getConvoMessages(1);

            expect(insertMessage.length).toBe(1);
        });



    });






});