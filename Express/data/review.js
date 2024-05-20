import db from '../db/database.js';

export async function getAll() {
  await db.execute('SELECT * FROM Reviews').then((result) => {
    console.log(result[0]);
    return result[0];
  });
}

export async function create(user_id, title, product_id, rating, content) {
  const created_at = new Date(Date.now()).toISOString().split('T')[0];

  return db
    .execute(
      'INSERT INTO Reviews (user_id, title, product_id, rating, content,created_at) VALUES (?,?,?,?,?,?)',
      [user_id, title, product_id, rating, content, created_at]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

export async function edit(review_id, title, product_id, rating, content) {
  const query = `
      UPDATE Reviews 
      SET title = ?, product_id = ?, rating = ?, content = ?
      WHERE review_id = ?`;

  const [result] = await db.execute(query, [
    title,
    product_id,
    rating,
    content,
    review_id,
  ]);

  return result[0];
}

export async function remove(review_id) {
  return db.execute('DELETE Reviews WHERE review_id=?', [review_id]);
}
