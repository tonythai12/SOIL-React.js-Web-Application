import express from 'express';
import 'express-async-errors';
import * as specialSaleController from '../controller/specialsale.js';

const router = express.Router();

// get user when user log in
router.get('/:user_id ', specialSaleController.getPreference);
router.post('/:user_id ', specialSaleController.updatePreference);

export default router;
