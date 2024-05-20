import db from '../db/database.js';

export async function getAll() {
  await db.execute('SELECT * FROM Products').then((result) => {
    console.log(result[0]);
    return result[0];
  });
}
