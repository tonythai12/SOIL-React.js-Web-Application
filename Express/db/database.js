import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

const db = pool.promise();

export default db;
