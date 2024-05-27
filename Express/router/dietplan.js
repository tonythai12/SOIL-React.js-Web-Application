import express from 'express';
import 'express-async-errors';
import * as dietController from '../controller/dietplan.js';

const router = express.Router();

router.get('/', dietController.getDietPlanList);
router.get('/:user_id', dietController.getDietPlan);
router.post('/:user_id', dietController.updateDietPlan);

export default router;
