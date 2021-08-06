import knex from 'knex';
import { Container } from 'typedi';

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

// const databaseToken = new Token('DATABASE_ACCESS');

export default db;
