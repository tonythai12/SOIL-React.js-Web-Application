import express from 'express';
import { config } from './config.js';
import db from './db/database.js';
import cors from 'cors';
import authRouter from './router/auth.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/soil/login', authRouter);

db.connect().then((connection) => console.log(connection));

app.listen(config.host.port, () => {
  console.log(`Server is running on port ${config.host.port}`);
});

export default app;
