exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments("user_id");

      tbl.integer("match_id").increments;
      tbl.integer("sender_id").increments;
      tbl.integer("recipient_id").increments;
      tbl.string("email", 255).notNullable().unique;
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

      tbl.string("hobbies", 255).notNullable();
    })
    .createTable("messages", tbl => {
      tbl.increments("message_id");

      tbl.string("message_body", 255);
      tbl.datetime("time").notNullable();
    })
    .createTable("user_sender", tbl => {
      tbl.increments("sender_id");

      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("user_recipient", tbl => {
      tbl.increments("recipient_id");

      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("conversations", tbl => {
      tbl.increments();

      tbl
        .integer("sender_id")
        .notNullable()
        .unsigned()
        .references("sender_id")
        .inTable("user_sender")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("recipient_id")
        .notNullable()
        .unsigned()
        .references("recipient_id")
        .inTable("user_recipient")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("message_id")
        .notNullable()
        .unsigned()
        .references("message_id")
        .inTable("messages")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("match", tbl => {
      tbl.increments("match_id");

      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("user_match", tbl => {
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
        .integer("match_id")
        .notNullable()
        .unsigned()
        .references("match_id")
        .inTable("match")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .boolean("match")
        .notNullable()
        .defaultTo("false");
      tbl
        .boolean("interested")
        .notNullable()
        .defaultTo("false");
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
    .dropTableIfExists("user_recipient")
    .dropTableIfExists("user_sender")
    .dropTableIfExists("user_hobbies")
    .dropTableIfExists("user_match")
    .dropTableIfExists("match")
    .dropTableIfExists("conversations")
    .dropTableIfExists("messages")
    .dropTableIfExists("hobbies")
    .dropTableIfExists("users");
};
