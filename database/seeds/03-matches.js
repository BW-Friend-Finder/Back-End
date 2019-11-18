exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_match")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_match").insert([
        { requester: 1, requestee: 2, matched: true }
      ]);
    });
};
