import express from 'express';
import 'express-async-errors';
import * as cartController from '../controller/cart.js';

const router = express.Router();

// get user's all cart lists
router.get('/', cartController.getCarts);
// update cart quantity
router.post('/:cart_id/:product_id', cartController.updatedCartQuantity);
// delete cart items
router.delete('/:cart_id/:product_id', cartController.deleteCart);

export default router;
