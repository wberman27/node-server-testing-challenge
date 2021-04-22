exports.up = function (knex) {
//create table
    return knex.schema.createTable("dogs", tbl => {
      tbl.increments();
      tbl.string("name", 128).unique().notNullable();
    });
};
  
exports.down = function (knex) {
// drop table
    return knex.schema.dropTableIfExists("dogs");
};
