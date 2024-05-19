import db from '../db/database.js';

export async function getAll(id) {
  await db
    .execute('SELECT * FROM shoppingCart WHERE user_id=?', [id])
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

export async function update(cart_id, product_id, quantity) {
  // Check if the cart item exists
  const [rows] = await db.execute(
    'SELECT * FROM cartItem WHERE cart_id=? AND product_id=?',
    [cart_id, product_id]
  );

  if (rows.length === 0) {
    return null; // Return null if no such cart item exists
  }

  // Update the quantity of the existing cart item
  const [result] = await db.execute(
    'UPDATE cartItem SET quantity=? WHERE cart_id=? AND product_id=?',
    [quantity, cart_id, product_id]
  );

  return result; // Return the result of the update operation
}

export async function remove(cart_id, product_id) {
  return db.execute('DELETE cartItem WHERE cart_id=? AND product_id=?', [
    cart_id,
    product_id,
  ]);
}
