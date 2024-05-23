import db from '../db/database.js';

export async function findById(user_id) {
  return db
    .execute('SELECT * FROM Users WHERE user_id=?', [user_id]) //
    .then((result) => result[0][0]);
}

export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM Users WHERE username=?', [username]) //
    .then((result) => result[0][0]);
}

export async function findByUseremail(email) {
  return db
    .execute('SELECT * FROM Users WHERE email=?', [email]) //
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { username, password_hash, email, imgUrl } = user;
  const created_at = new Date().toISOString().split('T')[0];
  return db
    .execute(
      'INSERT INTO Users (username, email, password_hash, imgUrl, created_at) VALUES (?,?,?,?,?)',
      [username, email, password_hash, imgUrl, created_at]
    )
    .then((result) => result[0].insertId);
}

// when user update user info
export async function updateUser(user_id, name, email, password, address) {
  return db.execute(
    'UPDATE Users SET username=? email=? password=? address=? WHERE user_id=?',
    [name, email, password, address, user_id]
  );
}

// when user is deleted
export async function deleteUser(user_id) {
  return db.execute('DELETE Users WHERE user_id=?', [user_id]);
}
