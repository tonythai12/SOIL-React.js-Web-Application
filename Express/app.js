import express from 'express';
import { config } from './config.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('incoming...');
  res.write('Welcome!');
  res.end();
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(config.host.port);
