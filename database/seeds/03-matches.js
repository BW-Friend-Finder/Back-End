exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_match")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_match").insert([
        { requester: 1, requestee: 2, matched: true },
        { requester: 5, requestee: 2, matched: true },
        { requester: 7, requestee: 4, matched: true },
        { requester: 4, requestee: 6, matched: true },
        { requester: 1, requestee: 7, matched: true }
      ]);
    });
};
