import db from '../db/database.js';

export async function create(user_id, product_name) {
  const created_at = new Date(Date.now()).toISOString().split('T')[0];

  return db
    .execute(
      'INSERT INTO Preference (user_id, product_name ,created_at) VALUES (?,?,?)',
      [user_id, product_name, created_at]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}
