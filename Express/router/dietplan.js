import express from 'express';
import 'express-async-errors';
import * as dietController from '../controller/diet.js';

const router = express.Router();

router.get('/', dietController.getDietPlan);
router.post('/:user_id', dietController.updateDietPlan);

export default router;
