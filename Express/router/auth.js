import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';

const router = express.Router();

// save user info when user sign up
router.post('/', authController.createUser);

// get user when user log in
router.get('/', authController.getUser);

// modify user info
router.post('/:id', authController.updateUser);

// delete user
router.delete('/:id', authController.removeUser);

export default router;
