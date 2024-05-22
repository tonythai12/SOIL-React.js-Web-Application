import db from '../db/database.js';
import bcrypt from 'bcrypt';
import * as dietPlanRepository from './data/dietplan.js';
import * as SpecialSaleRepository from './data/specialsale.js';

// when user sign up
export async function create(name, email, password, imgUrl) {
  const password_hash = await bcrypt.hash(password, 10);
  const created_at = new Date().toISOString().split('T')[0];

  const [emailRows] = await db.execute('SELECT * FROM Users WHERE email=?', [
    email,
  ]);
  const [nameRows] = await db.execute('SELECT * FROM Users WHERE username=?', [
    name,
  ]);

  // Check Email and Name duplication
  if (emailRows.length > 0) {
    return 'This email is already in use.';
  }
  if (nameRows.length > 0) {
    return 'This name is already in use.';
  }

  const [result] = await db.execute(
    'INSERT INTO Users (username, email, password_hash, imgUrl, created_at) VALUES (?,?,?,?,?)',
    [name, email, password_hash, imgUrl, created_at]
  );

  console.log(result);
  return result;
}

// when user login
export async function get(email, password) {
  try {
    // get user's info
    const rows = await db.execute('SELECT * FROM Users WHERE email=?', [email]);
    if (rows.length === 0) {
      return { checkEmailError: "'User does not exist" };
    }

    // when user exists, compare password with password_hash in db
    const user = rows[0][0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    // if password is matched, it return user info.
    const result = isMatch ? user : null;

    // if email and password is matched, find user's dietplan, preference info if it has the value.
    if (result) {
      const dietplans = dietPlanRepository.getAll() || [];
      const preference = SpecialSaleRepository.get(user_id) || '';

      // finally return object including all users info which will be saved in useState as a userData for whom logged in.
      return { ...result, dietplans, preference };
    }
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
