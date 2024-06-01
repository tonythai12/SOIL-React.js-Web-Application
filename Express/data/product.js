import db from '../db/database.js';

export async function getAll() {
  try {
    const result = await db.execute(
      'SELECT * FROM Products WHERE	isSpecial = false'
    );
    return result[0];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getAllSpecial() {
  try {
    const result = await db.execute(
      'SELECT * FROM Products WHERE isSpecial = true'
    );
    return result[0];
  } catch (error) {
    console.error('Error fetching special products:', error);
    throw error;
  }
}
