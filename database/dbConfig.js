const knex = require('knex');

const config = require('../knexfile.js');

const database_environment = process.env.DB_ENV || 'development';

module.exports = knex(config[database_environment]);