import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader && authHeader.split('Bearer ')[1];

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    console.log(`decoded => `, decoded);
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    console.log(`user =>`, user);
    if (!user) {
      return res.status(401).json({ message: 'User is not exists' });
    }
    req.userId = user.user_id; // req.customData
    next();
  });
};
