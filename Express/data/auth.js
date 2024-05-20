import db from '../db/database.js';
import bcrypt from 'bcrypt';

// when user sign up
export async function create(name, email, password, imgUrl) {
  const password_hash = bcrypt.hash(password, 10);
  const created_at = new Date(Date.now()).toISOString().split('T')[0];

  return db
    .execute(
      'INSERT INTO Users (username, email, password_hash, imgUrl, created_at) VALUES (?,?,?,?,?)',
      [name, email, password_hash, imgUrl, created_at]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

// when user login
export async function get(email, password) {
  try {
    // get user's info
    const [rows] = await db.execute('SELECT * FROM Users WHERE email=?', [
      email,
    ]);
    // if user does not exist, return null
    if (rows.length === 0) {
      return null;
    }

    // when user exists, compare password with password_hash in db
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    // if password is matched, it return user info.
    const result = isMatch ? user : null;
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// when user update user info
export async function update(user_id, name, email, password, address) {
  return db.execute(
    'UPDATE Users SET username=? email=? password=? address=? WHERE user_id=?',
    [name, email, password, address, user_id]
  );
}

// when user is deleted
export async function remove(user_id) {
  return db.execute('DELETE Users WHERE user_id=?', [user_id]);
}
