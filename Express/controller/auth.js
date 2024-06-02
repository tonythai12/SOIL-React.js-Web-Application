import * as authRepository from '../data/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';

// sign up
export async function signUp(req, res) {
  const { username, email, password } = req.body;

  // check if there is same username or email.
  const dupUserName = await authRepository.findByUsername(username);
  const dupUserEmail = await authRepository.findByUseremail(email);

  if (dupUserName) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  if (dupUserEmail) {
    return res.status(409).json({ message: `${email} already exists` });
  }

  // if username,email is passed, make password_hash using bcrypt.
  const password_hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
  // make user to User DB
  const userId = await authRepository.createUser({
    username,
    email,
    password_hash,
  });
  // create jwt token and return it to client when user sign up.
  const token = createJwtToken(userId.insertId);
  res.status(201).json({ token, username });
}

// Login
export async function login(req, res) {
  const { email, password } = req.body;
  // check if email is in the User DB
  const user = await authRepository.findByUseremail(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  // if email is in User DB, compare password with password_hash.
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  // if user is blocked by admin. it return message and user can't login.
  if (user.blocked) {
    res.status(204).json({
      message:
        'Your account has been blocked. Please contact support for further assistance.',
    });
  } else if (user && isValidPassword) {
    // if everything is passed, retrun user info and token so client can save it to state and localStorage.
    const token = createJwtToken(user.user_id);
    res.status(200).json({
      token: token,
      user_id: user?.user_id,
      username: user?.username,
      email: user?.email,
      created_at: user.created_at,
    });
  }
}

// created jwt token using id.
function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

// modify user Info in MyPage.
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

// when user delete their account.
export async function remove(req, res) {
  const { user_id } = req.params;
  try {
    const deleteResult = await authRepository.deleteUser(user_id);
    res.status(204).json(deleteResult);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
}

// if user is already logged in, so server get token, it return user info to client so they can be logged in until they log out.
export async function me(req, res) {
  const user = await authRepository.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
  });
}
