
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('conversations').del()
    .then(function () {
      // Inserts seed entries
      return knex('conversations').insert([
        {person_1: 1, person_2: 2},
        {person_1: 2, person_2: 1},
        {person_1: 2, person_2: 3},
        {person_1: 1, person_2: 3},
        {person_1: 3, person_2: 1}
      ]);
    });
};
