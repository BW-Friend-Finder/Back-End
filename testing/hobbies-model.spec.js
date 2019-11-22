const hobbies = require('../models/hobbies-model.js');
const users = require('../models/users-model.js');
const db = require('../configs/dbConfig.js');




const test = {
    user_id:1,
    hobbies_id:1
};

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


const hobby = {
    hobby_name: 'spelunking'
};

describe('hobbies model', () => {
    beforeEach(async () => {
        await db('user_hobbies').truncate();
        await db('users').truncate();
        await db('hobbies').truncate();
    });

    describe('add user_hobbies', () => {

        it('should insert a hobby and user_id to user_hobbies', async () => {


            await users.insert(user);
            await hobbies.insertNew(hobby);
            await hobbies.insert(test);

            const user_hobbies = await db("user_hobbies");
            expect(user_hobbies.length).toBe(1);
        });


        it('should return the new hobby', async () => {

            await hobbies.insertNew(hobby);
            
            const checkHobby =  await hobbies.findById(1);

            expect(checkHobby.hobby_name).toBe('spelunking');
        });


        it('should return all the hobbies', async () => {

            await hobbies.insertNew(hobby);

            const hobbyList = await hobbies.find();

            expect(hobbyList.length).toBe(1);
        });


        it('should return user`s hobbies by user_id', async () => {
           
            const test1 = {
                user_id:1,
                hobbies_id:2
            };
            
            const user1 = {
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

            const hobby2 = {
                hobby_name: 'knitting'
            };



            await users.insert(user1);
            await hobbies.insertNew(hobby2);
            await hobbies.insert(test1);




            const getUserHobbies = await hobbies.findByUserId(1);

            expect(getUserHobbies.length).toBe(1);

        });

    });



});