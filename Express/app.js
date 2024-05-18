import express from 'express';
import { config } from './config.js';
import db from './db/database.js';

const app = express();
app.use(express.json());

db.getConnection().then((connection) => console.log(connection));

app.listen(config.host.port, () => {
  console.log(`Server is running on port ${config.host.port}`);
});
