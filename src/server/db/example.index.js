const db = require('knex')({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    database: 'groupfoodie',
    user: 'austinyeon',
    password: '3747',
    port: 5432,
  },
});

module.exports = db;