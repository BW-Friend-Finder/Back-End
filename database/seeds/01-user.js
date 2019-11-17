exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: 1,
          email: "michael_scott@example.com",
          password: "pass123",
          first_name: "Michael",
          last_name: "Scott",
          age: 48,
          gender: "male",
          city: "Scranton",
          state: "PA",
          zipcode: 18509
        },
        {
          user_id: 2,
          email: "audrey_lane@example.com",
          password: "pass123",
          first_name: "Audrey",
          last_name: "Lane",
          age: 25,
          gender: "female",
          city: "San Jose",
          state: "SD",
          zipcode: 83475
        },
        {
          user_id: 3,
          email: "arthur_pena@example.com",
          password: "pass123",
          first_name: "Arthur",
          last_name: "Pena",
          age: 48,
          gender: "male",
          city: "Cedar Hill",
          state: "CA",
          zipcode: 38597
        },
        {
          user_id: 4,
          email: "greg_robertson@example.com",
          password: "pass123",
          first_name: "Greg",
          last_name: "Robertson",
          age: 23,
          gender: "male",
          city: "Albany",
          state: "RI",
          zipcode: 56989
        },
        {
          user_id: 5,
          email: "stella_murphy@example.com",
          password: "pass123",
          first_name: "Stella",
          last_name: "Murphy",
          age: 28,
          gender: "female",
          city: "Lansing",
          state: "ID",
          zipcode: 68545
        },
        {
          user_id: 6,
          email: "irma_flores@example.com",
          password: "pass123",
          first_name: "Irma",
          last_name: "Flores",
          age: 44,
          gender: "female",
          city: "Richardson",
          state: "WI",
          zipcode: 35697
        },
        {
          user_id: 7,
          email: "savannah_russell@example.com",
          password: "pass123",
          first_name: "Savannah",
          last_name: "Russell",
          age: 26,
          gender: "female",
          city: "Addison",
          state: "DE",
          zipcode: 31636
        },
        {
          user_id: 8,
          email: "jenny_williamson@example.com",
          password: "pass123",
          first_name: "Jenny",
          last_name: "Williamson",
          age: 36,
          gender: "female",
          city: "Belen",
          state: "IL",
          zipcode: 55793
        },
        {
          user_id: 9,
          email: "dwight_schrute@example.com",
          password: "pass123",
          first_name: "Dwight",
          last_name: "Schrute",
          age: 44,
          gender: "male",
          city: "Scranton",
          state: "PA",
          zipcode: 18505
        },
        {
          user_id: 10,
          email: "jim_halpert@example.com",
          password: "pass123",
          first_name: "Jim",
          last_name: "Halpert",
          age: 33,
          gender: "male",
          city: "Scranton",
          state: "PA",
          zipcode: 18503
        }
      ]);
    });
};
