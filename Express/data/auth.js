import db from '../db/database.js';

// get userInfo by user_id
export async function findById(user_id) {
  return db
    .execute('SELECT * FROM Users WHERE user_id=?', [user_id]) //
    .then((result) => result[0][0]);
}

// get userInfo by username
export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM Users WHERE username=?', [username]) //
    .then((result) => result[0][0]);
}

// get userInfo by email
export async function findByUseremail(email) {
  return db
    .execute('SELECT * FROM Users WHERE email=?', [email]) //
    .then((result) => {
      return result[0][0];
    });
}

// sign up : make user to User DB when everything is passwed from controller.
export async function createUser(user) {
  const { username, password_hash, email } = user;
  const created_at = new Date().toISOString().split('T')[0];
  return db
    .execute(
      'INSERT INTO Users (username, email, password_hash, created_at) VALUES (?,?,?,?)',
      [username, email, password_hash, created_at]
    )
    .then((result) => result[0].insertId);
}

// when user update user info
export async function updateUser(user_id, username, email, password_hash) {
  return db.execute(
    'UPDATE Users SET username=?, email=?, password_hash=? WHERE user_id=?',
    [username, email, password_hash, user_id]
  );
}

// when user is deleted
export async function deleteUser(user_id) {
  return db.execute('DELETE FROM Users WHERE user_id=?', [user_id]);
}
