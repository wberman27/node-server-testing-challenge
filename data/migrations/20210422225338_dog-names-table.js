exports.up = function (knex) {
//create table
    return knex.schema.createTable("dogs", tbl => {
      tbl.increments(); //auto-incrementing primary key
      tbl.string("name", 128).unique().notNullable(); //required and must be unique name
    });
};
  
exports.down = function (knex) {
// drop table
    return knex.schema.dropTableIfExists("dogs");
};
