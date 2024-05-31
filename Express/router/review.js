import express from 'express';
import 'express-async-errors';
import * as reviewController from '../controller/review.js';

const router = express.Router();

router.get('/', reviewController.getReviews);
router.post('/', reviewController.createReviews);
router.put('/:review_id', reviewController.editReviews);
router.delete('/:review_id', reviewController.deleteReviews);
router.post('/:user_id', reviewController.updateFollowings);

export default router;
