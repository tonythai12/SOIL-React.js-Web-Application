import express from 'express';
import 'express-async-errors';
import * as productController from '../controller/product.js';

const router = express.Router();

// get all products
router.get('/', productController.getProducts);
// get all special products
router.get('/special', productController.getSpecialProducts);
export default router;
