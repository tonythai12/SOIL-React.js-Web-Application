import * as authRepository from '../data/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dietPlanRepository from '../data/dietplan.js';
import * as SpecialSaleRepository from '../data/specialsale.js';
import { config } from '../config.js';

export async function signUp(req, res) {
  const { username, email, password } = req.body;

  const dupUserName = await authRepository.findByUsername(username);
  const dupUserEmail = await authRepository.findByUseremail(email);

  if (dupUserName) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  if (dupUserEmail) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  const password_hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await authRepository.createUser({
    username,
    email,
    password_hash,
  });
  // create jwt token and return it to client when user sign up.
  const token = createJwtToken(userId.insertId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await authRepository.findByUseremail(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  // if user email and password is passed, get dietplan, preference info and return all user info as an object.
  if (user && isValidPassword) {
    // const dietplans =
    //   (await dietPlanRepository.getByUserId(user.user_id)) || [];
    // const preference = (await SpecialSaleRepository.get(user.user_id)) || '';

    // console.log(`dietplans => ${dietplans}`);
    // console.log(`preference => ${preference}`);
    const token = createJwtToken(user.user_id);
    res.status(200).json({
      token: token,
      user_id: user?.user_id,
      username: user?.username,
      email: user?.email,
      // dietplans: dietplans.length > 0 ? dietplans : [],
      // preference: preference ? preference : '',
      created_at: user.created_at,
    });
  }
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function modifyUserInfo(req, res) {
  const { user_id } = req.params;
  const { username, email, password } = req.body;

  // check duplication when user modify user's info
  const dupUserName = await authRepository.findByUsername(username);
  const dupUserEmail = await authRepository.findByUseremail(email);

  if (dupUserName) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  if (dupUserEmail) {
    return res.status(409).json({ message: `${email} already exists` });
  }

  // make password hash when user change password in Mypage.
  const password_hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const user = await authRepository.updateUser(
    user_id,
    username,
    email,
    password_hash
  );

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Update failed' });
  }
}

export async function remove(req, res) {
  const { user_id } = req.params;
  try {
    // console.log(`userId =>`, user_id);
    const deleteResult = await authRepository.deleteUser(user_id);
    console.log(`deleteResult =>`, deleteResult);

    res.status(204).json(deleteResult);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
}

export async function me(req, res) {
  const user = await authRepository.findById(req.userId);

  // const dietplans = dietPlanRepository.getByUserId(req.user_id) || [];
  // const preference = SpecialSaleRepository.get(req.user_id) || '';
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({
    // token: req.token,
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
    // dietplans,
    // preference,
  });
}
