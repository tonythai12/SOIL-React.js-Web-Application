import express from 'express';
import 'express-async-errors';
import * as cartController from '../controller/cart.js';

const router = express.Router();

// get user's all cart lists
router.get('/:user_id', cartController.getCarts);
// add to cart
router.post('/:user_id', cartController.addToCart);
// update cart quantity
router.post('/', cartController.updatedCartQuantity);
// delete cart items
router.delete('/', cartController.deleteCart);

export default router;
