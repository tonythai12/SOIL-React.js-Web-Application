import * as authRepository from '../data/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dietPlanRepository from '../data/dietplan.js';
import * as SpecialSaleRepository from '../data/specialsale.js';

export async function signUp(req, res) {
  const { username, email, password, address, imgUrl } = req.body;
  const dupUserName = await userRepository.findByUsername(username);
  const dupUserEmail = await userRepository.findByUseremail(email);
  if (dupUserName) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  if (dupUserEmail) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  const password_hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password_hash,
    username,
    email,
    address,
    imgUrl,
  });
  // create jwt token and return it to client when user sign up.
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userRepository.findByUseremail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  // if user email and password is passed, get dietplan, preference info and return all user info as an object.
  if (isValidPassword) {
    const dietplans = dietPlanRepository.getAll() || [];
    const preference = SpecialSaleRepository.get(user_id) || '';

    const token = createJwtToken(user.user_id);
    // res.status(200).json({ token, username });
    if (res.status === 200) {
      return { ...result, dietplans, preference, token };
    }
  }
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export function modifyUserInfo(req, res) {
  const user_id = req.params.id;
  const { username, email, password, address } = req.body;

  const user = authRepository.updateUser(
    user_id,
    username,
    email,
    password,
    address
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Update failed' });
  }
}

export function remove(req, res) {
  const user_id = req.params.id;
  authRepository.deleteUser(user_id);
  res.status(204);
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  const dietplans = dietPlanRepository.getAll() || [];
  const preference = SpecialSaleRepository.get(user_id) || '';
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res
    .status(200)
    .json({
      token: req.token,
      username: user.username,
      email: user.email,
      address: user.address,
      imgUrl: user.imgUrl,
      created_at: user.created_at,
      dietplans,
      preference,
    });
}
