import express from 'express';
import 'express-async-errors';
import * as reviewController from '../controller/product.js';

const router = express.Router();

router.get('/', reviewController.getReviews);
router.post('/', reviewController.createReviews);
router.put('/:review_id', reviewController.editReviews);
router.delete('/:review_id', reviewController.deleteReviews);

export default router;
