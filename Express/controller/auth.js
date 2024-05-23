import * as authRepository from '../data/auth.js';

export async function createUser(req, res, next) {
  const { name, email, password, imgUrl } = req.body;
  try {
    const user = await authRepository.create(name, email, password, imgUrl);
    if (user.error) {
      return res.status(400).json({ message: user.error });
    }
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export function getUser(req, res, next) {
  const { email, password } = req.query;

  if (email && password) {
    const user = authRepository.get(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User login failed' });
    }
  }
}

export function updateUser(req, res, next) {
  const user_id = req.params.id;
  const { name, email, password, address } = req.query;

  const user = authRepository.update(user_id, name, email, password, address);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Update failed' });
  }
}

export function removeUser(req, res, next) {
  const user_id = req.params.id;
  authRepository.remove(user_id);
  res.status(204);
}
