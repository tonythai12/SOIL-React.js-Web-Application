import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// save user info when user sign up
router.post('/signup', authController.signUp);

// get user when user log in
router.post('/login', authController.login);

// modify user info
router.post('/mypage/:user_id', authController.modifyUserInfo);

// delete user
router.delete('/mypage/:user_id', authController.remove);

// verify user token from server.
router.get('/me', isAuth, authController.me);

export default router;
