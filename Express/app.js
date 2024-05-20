import express from 'express';
import { config } from './config.js';
import db from './db/database.js';
import cors from 'cors';
import authRouter from './router/auth.js';
import productRouter from './router/product.js';
import specialSaleRouter from './router/specialsale.js';
import cartRouter from './router/cart.js';
import dietRouter from './router/dietplan.js';
import reviewRouter from './router/review.js';

const app = express();
app.use(express.json());
app.use(cors());

// mysql connection
db.connect().then((connection) => console.log(connection));

// router (handling data and logic)
app.use('/soil/login', authRouter);
app.use('/soil/product', productRouter);
app.use('/soil/sale', specialSaleRouter);
app.use('/soil/cart', cartRouter);
app.use('/soil/dietplan', dietRouter);
app.use('/soil/review', reviewRouter);

// server start
app.listen(config.host.port, () => {
  console.log(`Server is running on port ${config.host.port}`);
});

export default app;
