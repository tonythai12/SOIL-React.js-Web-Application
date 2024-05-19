import express from 'express';
import { config } from './config.js';
import db from './db/database.js';
import cors from 'cors';
import authRouter from './router/auth.js';
import productRouter from './router/product.js';

const app = express();
app.use(express.json());
app.use(cors());

// mysql connection
db.connect().then((connection) => console.log(connection));

// router (handling data and logic)
app.use('/soil/login', authRouter);
app.use('soil/product', productRouter);

// server start
app.listen(config.host.port, () => {
  console.log(`Server is running on port ${config.host.port}`);
});

export default app;
