exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments("user_id");

      tbl.string("email", 255).notNullable();
      tbl.unique('email');
      tbl.string("password", 255).notNullable();
      tbl.string("first_name", 255).notNullable();
      tbl.string("last_name", 255).notNullable();
      tbl.integer("age").notNullable();
      tbl.string("gender", 64);
      tbl.string("city", 128);
      tbl.string("state", 128);
      tbl.integer("zipcode", 9).notNullable();
    })
    .createTable("hobbies", tbl => {
      tbl.increments("hobbies_id");

      tbl.string("hobby_name", 255).notNullable();
    })
    .createTable("conversations", tbl => {
      tbl.increments();

      tbl
        .integer("person_1")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("person_2")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("messages", tbl => {
      tbl.increments("message_id");

      tbl
        .integer("conversation_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("conversations")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl.string("message_body", 255);
      tbl.datetime("time").defaultTo(knex.fn.now()).notNullable();
    })
    .createTable("user_match", tbl => {
      tbl.increments();

      tbl
        .integer("requestee")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("requester")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .boolean("matched")
        .notNullable()
        .defaultTo(0);
    })
    .createTable("user_hobbies", tbl => {
      tbl.increments();

      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("hobbies_id")
        .notNullable()
        .unsigned()
        .references("hobbies_id")
        .inTable("hobbies")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_hobbies")
    .dropTableIfExists("user_match")
    .dropTableIfExists("conversations")
    .dropTableIfExists("match")
    .dropTableIfExists("messages")
    .dropTableIfExists("hobbies")
    .dropTableIfExists("users");
};
