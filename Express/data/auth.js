import db from '../db/database';

// when user sign up
export async function create(name, email, password, imgUrl) {
  const created_at = new Date(Date.now()).toISOString().split('T')[0];
  return db
    .execute(
      'INSERT INTO users (username, email, password_hash, imgUrl, created_at) VALUES (?,?,?,?,?)',
      [name, email, password, imgUrl, created_at]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

// when user login
export async function get(email, password) {
  return db
    .execute('SELECT * FROM users WHERE email=? password=?', [email, password])
    .then((result) => {
      console.log(result);
      return result[0][0];
    });
}

// when user update user info
export async function update(user_id, name, email, password, address) {
  return db.execute(
    'UPDATE users SET username=? email=? password=? address=? WHERE user_id=?',
    [name, email, password, address, user_id]
  );
}

// when user is deleted
export async function remove(user_id) {
  return db.execute('DELETE users WHERE user_id=?', [user_id]);
}
