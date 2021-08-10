import knex from 'knex';
import { Container } from 'typedi';

const db = knex({
  client: 'postgresql',
  connection: {
    host: 'localhost',
    database: 'groupfoodie',
    user: 'postgres',
    password: 'hrlax44',
    port: 5432,
  },
});
Container.set('DATABASE_ACCESS', db);
// const databaseToken = new Token('DATABASE_ACCESS');

export default db;
