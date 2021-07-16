const db = require('knex')({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    database: 'groupfoodie',
    user: 'postgres',
    password: '',
    port: 5432,
  },
});

module.exports = db;