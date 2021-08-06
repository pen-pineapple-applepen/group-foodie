import knex from 'knex';
import { Container } from 'typedi';

const db = knex({
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    database: 'groupfoodie',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    port: 5432,
  },
});
Container.set('DATABASE_ACCESS', db);
// const databaseToken = new Token('DATABASE_ACCESS');

export default db;
