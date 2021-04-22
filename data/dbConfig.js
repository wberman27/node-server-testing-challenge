const knex = require("knex");
const config = require("../knexfile.js");
const environment = process.env.DB_ENV || "development";
//use db_env if exists, otherwise dev env
module.exports = knex(config[environment]);
