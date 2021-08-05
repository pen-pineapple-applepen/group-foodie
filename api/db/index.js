import knex from 'knex';

const db = knex({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    database: 'groupfoodie',
    user: 'postgres',
    password: '',
    port: 5432,
  },
});

export default db;