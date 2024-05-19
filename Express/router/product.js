import express from 'express';
import 'express-async-errors';
import * as productController from '../controller/product.js';

const router = express.Router();

// get user when user log in
router.get('/', productController.getProducts);

export default router;
