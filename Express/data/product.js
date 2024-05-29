import db from '../db/database.js';

export async function getAll() {
  try {
    const result = await db.execute('SELECT * FROM Products');
    return result[0];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
