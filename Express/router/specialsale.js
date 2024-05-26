import express from 'express';
import 'express-async-errors';
import * as specialSaleController from '../controller/specialsale.js';

const router = express.Router();

router.get('/', specialSaleController.getSaleProducts);
router.get('/:user_id ', specialSaleController.getPreference);
router.post('/:user_id ', specialSaleController.updatePreference);

export default router;
