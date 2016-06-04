import knex from 'knex';
import knexConfig from '../../knexfile';

// singleton connection
let db;

export default function () {
  db = db || knex(knexConfig[process.env.NODE_ENV]);
  return db;
}
